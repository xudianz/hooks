import { NextFunction, Request, Response } from 'express'
import { Lesson, LessonDocument } from '../models'

export const list = async (req: Request, res: Response, _next: NextFunction) => {
  const { category, offset, limit } = req.query
  const categoryReq = category as string
  const offsetReq: number = Number(offset)
  const limitReq: number = Number(limit)

  let query: Partial<LessonDocument> = {}
  if (categoryReq && categoryReq !== 'all') {
    query.category = categoryReq
  }
  const total: number = await Lesson.count(query)
  const list: LessonDocument[] = await Lesson.find(query).sort({order: 1}).skip(offsetReq).limit(limitReq)
  res.json({
    success: true,
    data: {
      list,
      hasMore: total > offsetReq + limitReq
    }
  })
}