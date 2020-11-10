import request from './index'
import { LessonData, SliderData } from '@/type'

export const getSliderList = () => {
  return request.get<SliderData, SliderData>('/slider/list')
}

export function getLessonList<T> (category: string = 'all', offset: number, limit: number) {
  return request.get<T, T>('/lesson/list', {
    params: {
      category,
      offset,
      limit
    }
  })
}