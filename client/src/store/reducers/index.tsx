import { combineReducers, ReducersMapObject, AnyAction, Reducer } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import home, { HomeState } from './home'
import mine, { MineState } from './mine'
import profile, { ProfileState } from './profile'
import history from '@/history'

interface RootState {
  home: HomeState,
  mine: MineState,
  profile: ProfileState,
  router: RouterState
}

const reducers: ReducersMapObject<RootState, AnyAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history)
}

const rootReducer: Reducer<RootState, AnyAction> = combineReducers<RootState>(reducers)

export default rootReducer
