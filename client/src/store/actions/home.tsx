import * as actionTypes from '@/store/action-types'
import { getLessonList, getSliderList } from '@/api/home'
import { StoreDispatch, StoreGetState } from '@/store'
import { LessonData } from '@/type'

export default {
  setCurrentCategory(currentCategory: string) {
    return { type: actionTypes.SET_CURRENT_CATEGORY, payload: currentCategory}
  },
  getSliders() {
    // redux-promise
    return { type: actionTypes.SLIDERS, payload: getSliderList() }
  },
  getLessons() {
    return (dispatch: StoreDispatch, getState: StoreGetState) => {
      (async function() {
        let { currentCategory, lessons: { hasMore, limit, loading, offset } } = getState().home
        if (!loading && hasMore) {
          // dispatch()
          const result: LessonData = await getLessonList<LessonData>(currentCategory, offset, limit)
        }
      })()
    }
  }
}