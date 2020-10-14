import { NextFunction, Request, Response } from "express";
import { User, UserDocument } from "../models";
import { validateRegisterInput } from '../utils/validator'
import HttpException from '../exception/httpException'
import { StatusCodes } from 'http-status-codes'

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