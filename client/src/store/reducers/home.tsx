import { AnyAction } from 'redux'
import { HomeState } from '@/type/state'

const initialState: HomeState = {}

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  return state
}