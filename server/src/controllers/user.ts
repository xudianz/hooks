import { NextFunction, Request, Response } from "express";
import { User } from "../models";

// 1.合法性校验 2.异常校验
export const register = async (req: Request, res: Response, _next: NextFunction) => {
  let { username, password, confirmPassword, email } = req.body
  let user = new User({ username, password, confirmPassword, email })
  await user.save()
  res.json({
    success: true,
    data: user,
    message: '恭喜您，注册成功！'
  })
}