import express, { Express, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan' // 打印日志
import helmet from 'helmet' // 用来过滤
import 'dotenv/config' // 读取.env文件 写入process.env
import path from 'path'
import * as userController from './controllers/user'
import * as sliderController from './controllers/slider'
import * as lessonController from './controllers/lesson'
import { Slider, Lesson } from './models'
import multer from 'multer' // 上传文件

import errorMiddleware from './middlewares/errorMiddleware'
import HttpException from './exception/httpException'

// 上传位置
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public', 'uploads'),
  filename(_req: Request, file: Express.Multer.File, callback) {
    callback(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

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

app.get('/slider/list', sliderController.list)
app.get('/lesson/list', lessonController.list)
app.post('/user/register', userController.register)
app.post('/user/login', userController.login)
app.get('/user/validate', userController.validate)
app.post('/user/uploadAvatar', upload.single('avatar'), userController.uploadAvatar)

// 如果没有匹配到路由 创建一个自定义404错误对象 并传递给错误中间件
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, '此路径未分配路由')
  next(error)
})
app.use(errorMiddleware);

// 链接数据库
(async function() {
  const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/test'
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  // 初始化slider
  await initSliderList()
  await initLessonList()

  const PORT = process.env.PORT || 8001
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
  })
})();

async function initSliderList() {
  // await Slider.remove(() => {})
  const sliders = await Slider.find()
  if (sliders.length === 0) {
    const list = [
      { url: '//image5.suning.cn/uimg/cms/img/160431697209684122.jpg' },
      { url: '//image3.suning.cn/uimg/cms/img/160431679213713364.jpg' },
      { url: '//image3.suning.cn/uimg/cms/img/160431529838820854.jpg' }
    ]
    await Slider.create(list)
  }
}

async function initLessonList() {
  // await Lesson.remove(() => {})
  const lessons = await Lesson.find()
  if (lessons.length === 0) {
    const list = [
      {
        order: 1,
        title: 'react技术栈1',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1020,
        category: 'react'
      },
      {
        order: 2,
        title: 'react技术栈2',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1050,
        category: 'react'
      },
      {
        order: 3,
        title: 'react技术栈3',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1030,
        category: 'react'
      },
      {
        order: 4,
        title: 'react技术栈4',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1040,
        category: 'react'
      },
      {
        order: 5,
        title: 'react技术栈5',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1090,
        category: 'react'
      },
      {
        order: 6,
        title: 'vue技术栈6',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1020,
        category: 'vue'
      },
      {
        order: 7,
        title: 'vue技术栈7',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1050,
        category: 'vue'
      },
      {
        order: 8,
        title: 'vue技术栈8',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1030,
        category: 'vue'
      },
      {
        order: 9,
        title: 'vue技术栈9',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1040,
        category: 'vue'
      },
      {
        order: 10,
        title: 'vue技术栈10',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1090,
        category: 'vue'
      },
      {
        order: 11,
        title: 'react技术栈11',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1020,
        category: 'react'
      },
      {
        order: 12,
        title: 'react技术栈12',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1050,
        category: 'react'
      },
      {
        order: 13,
        title: 'react技术栈13',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1030,
        category: 'react'
      },
      {
        order: 14,
        title: 'react技术栈14',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1040,
        category: 'react'
      },
      {
        order: 15,
        title: 'react技术栈15',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1090,
        category: 'react'
      },
      {
        order: 16,
        title: 'vue技术栈16',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1020,
        category: 'vue'
      },
      {
        order: 17,
        title: 'vue技术栈17',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1050,
        category: 'vue'
      },
      {
        order: 18,
        title: 'vue技术栈18',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1030,
        category: 'vue'
      },
      {
        order: 19,
        title: 'vue技术栈19',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1040,
        category: 'vue'
      },
      {
        order: 20,
        title: 'vue技术栈20',
        video: 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/13095d08345954365301432321/v.f20.mp4?dockingId=e8354436-4255-4c6d-a53b-1f2b009a42c8&storageSource=3',
        poster: '//m.360buyimg.com/mobilecms/s750x750_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q80.dpg.webp',
        url: '//img14.360buyimg.com/mobilecms/s372x372_jfs/t1/127852/35/7984/98067/5f194cb4E3199bf02/273edcc3cd3442fe.jpg!q70.dpg.webp',
        price: 1090,
        category: 'vue'
      }
    ]
    await Lesson.create(list)
  }
}
