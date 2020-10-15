import { validate } from '@/api/profile'
import * as actionTypes from '@/store/action-types'
import { push } from 'connected-react-router'

export default {
  validate() {
    return { type: actionTypes.VALIDATE, payload: validate() }
  },
  logout() {
    return (dispatch: any) => {
      sessionStorage.removeItem('token')
      dispatch(push('/login'))
    }
  }
}