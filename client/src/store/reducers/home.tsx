import { AnyAction } from 'redux'
import { HomeState } from '@/type'
import * as actionTypes from '@/store/action-types'

const initialState: HomeState = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    limit: 5,
    offset: 0
  }
}

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload }
    case actionTypes.SLIDERS:
      return { ...state, sliders: action.payload.data }
    case actionTypes.SET_LESSONS:

      // state.lessons.loading = false
      // state.lessons.list = [...state.lessons.list, ...action.payload.list]
      // state.lessons.hasMore = action.payload.hasMore
      // state.lessons.offset = state.lessons.offset + action.payload.list.length

      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: false,
          list: [...state.lessons.list, ...action.payload.list],
          hasMore: action.payload.hasMore,
          offset: state.lessons.offset + action.payload.list.length
        }
      }
    default:
      return state
  }
}