import request from './index'
import { SliderData } from '@/type'

export const getSliderList = () => {
  return request.get<SliderData, SliderData>('/slider/list')
}