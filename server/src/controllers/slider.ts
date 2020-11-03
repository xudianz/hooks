import { NextFunction, Request, Response } from 'express'
import { Slider, SliderDocument } from '../models'

export const list = async (_req: Request, res: Response, _next: NextFunction) => {
  const sliders: SliderDocument[] = await Slider.find()
  res.json({
    success: true,
    data: sliders
  })
}