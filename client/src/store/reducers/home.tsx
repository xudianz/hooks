import { AnyAction } from 'redux'
import { HomeState } from '@/type'
import * as actionTypes from '@/store/action-types'

const initialState: HomeState = {
  currentCategory: 'all',
  sliders: []
}

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload }
    case actionTypes.SLIDERS:
      return { ...state, sliders: action.payload.data }
    default:
      return state
  }
}