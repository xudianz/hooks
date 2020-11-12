import { ReducersMapObject, AnyAction, Reducer } from 'redux' // combineReducers
import { connectRouter } from 'connected-react-router'
import home from './home'
import mine from './mine'
import profile from './profile'
import history from '@/history'
import { CombinedState } from '@/type/state'
import produce from 'immer'
import { combineReducers } from 'redux-immer'

const reducers: ReducersMapObject<CombinedState, AnyAction> = {
  home,
  mine,
  profile,
  router: connectRouter(history)
}

const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers(produce, reducers)

export default rootReducer
