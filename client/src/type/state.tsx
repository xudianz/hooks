import { RouterState } from 'connected-react-router'

export interface HomeState {
  currentCategory: string
}

export interface MineState {

}

// 当前用户信息
export interface User {
  id?: string,
  username: string,
  email: string,
  avatar: string
}

export enum LOGIN_TYPES {
  UN_VALIDATE = 'UN_VALIDATE',
  LOGINED = 'LOGINED',
  UN_LOGINED = 'UN_LOGINED'
}

export interface ProfileState {
  loginState: LOGIN_TYPES,
  user: User | null,
  error: string | null
}

export interface CombinedState {
  home: HomeState,
  mine: MineState,
  profile: ProfileState,
  router: RouterState
}
