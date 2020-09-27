import { AnyAction } from 'redux'
import { ProfileState } from '@/type/state'

const initialState: ProfileState = {}

export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
  return state
}