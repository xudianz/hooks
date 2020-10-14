import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan' // 打印日志
import helmet from 'helmet' // 用来过滤
import 'dotenv/config' // 读取.env文件 写入process.env
import path from 'path'
import * as userController from './controllers/user'
// import multer from 'multer' // 上传文件

import errorMiddleware from './middlewares/errorMiddleware'
import HttpException from './exception/httpException'

const app: Express = express()
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) // express.json = bodyParser.json
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res, _next) => {
  res.json({
    success: true,
    data: 'hello world'
  })
});

app.post('/user/register', userController.register)

// 如果没有匹配到路由 创建一个自定义404错误对象 并传递给错误中间件
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, '此路径未分配路由')
  next(error)
})
app.use(errorMiddleware);

(async function() {
  const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/test'
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const PORT = process.env.PORT || 8001
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
  })
})();
