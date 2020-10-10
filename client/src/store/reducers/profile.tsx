import { AnyAction } from 'redux'
import { ProfileState, LOGIN_TYPES } from '@/type/state'

const initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null
}

export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
  return state
}