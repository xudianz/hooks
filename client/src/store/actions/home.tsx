import * as actionTypes from '@/store/action-types'
import { getSliderList } from '@/api/home'

export default {
  setCurrentCategory(currentCategory: string) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory}
  },
  getSliders() {
    // redux-promise
    return { type: actionTypes.SLIDERS, payload: getSliderList() }
  }
}