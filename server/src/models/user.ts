import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose'
import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface UserDocument extends Document {
  username: string,
  password: string,
  avatar: string,
  email: string,
  getToken: () => string,
  _doc: UserDocument
}

const UserSchema: Schema<UserDocument> = new Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minlength: [6, '最小长度不能小于6位'],
    maxlength: [12, '最大长度不能大于12位']
  },
  password: String,
  avatar: String,
  email: {
    type: String,
    trim: true,
    validate: {
      validator: validator.isEmail
    }
  }
},
{
  timestamps: true,
  toJSON: {
    transform: function(_doc:any, result:any) {
      result.id = result._id
      delete result._id
      delete result.__v
      delete result.password
      delete result.createdAt
      delete result.updatedAt
      return result
    }
  }
});

UserSchema.pre<UserDocument>('save', async function(next: HookNextFunction) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    this.password = await bcryptjs.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

// User model扩展login方法
UserSchema.static('login', async function(this: any, username: string, password: string): Promise<UserDocument | null> {
  let user: (UserDocument | null) = await this.model('User').findOne({ username })
  if (user) {
    const mached = await bcryptjs.compare(password, user.password)
    if (mached) {
      return user
    } else {
      return null
    }
  } else {
    return null
  }
})

interface UserModel<T extends Document> extends Model<T> {
  login: (username: string, password: string) => UserDocument | null
}

export interface UserPaylod {
  id: string
}

// 给User模型的实例扩展方法
UserSchema.methods.getToken = function(this: UserDocument): string {
  let payload: UserPaylod = { id: this.id }
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' })
}

export const User: UserModel<UserDocument> = mongoose.model<UserDocument, UserModel<UserDocument>>('User', UserSchema)