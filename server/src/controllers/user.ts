import { NextFunction, Request, Response } from "express";
import { User, UserDocument, UserPaylod } from "../models";
import { validateRegisterInput } from '../utils/validator'
import HttpException from '../exception/httpException'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// 1.合法性校验 2.异常校验
export const register = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password, confirmPassword, email } = req.body
  let { valid, errors } = validateRegisterInput(username, password, confirmPassword, email)
  try {
    if (!valid) {
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, '用户提交的参数不正确', errors)
    }
    // 用户名是否重复
    let oldUser: (UserDocument | null) = await User.findOne({username})
    if (oldUser) {
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, '用户名重复', errors)
    }
    // 保存
    let user: UserDocument = new User({ username, password, confirmPassword, email })
    await user.save()
    res.json({
      success: true,
      data: user,
      message: '恭喜您，注册成功！'
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password } = req.body
    let user: UserDocument | null = await User.login(username, password)
    if (!user) {
      throw new HttpException(StatusCodes.UNAUTHORIZED, '用户名不存在，登录失败')
    }
    let token = user.getToken()
    res.json({
      success: true,
      data: token
    })
  } catch (error) {
    next(error)
  }
}

export const validate = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'authorization未提供'))
    return
  }
  const token = authorization!.split(' ')[1]
  if (!token) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'authorization未提供'))
    return
  }
  try {
    const userPaylod: UserPaylod = jwt.verify(token, process.env.JWT_SECRET_KEY || 'xudianz') as UserPaylod
    let user: UserDocument|null = await User.findById(userPaylod.id)
    if (user) {
      res.json({
        success: true,
        data: user.toJSON()
      })
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, '用户未找到'))
    }
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'token不合法'))
  }
}