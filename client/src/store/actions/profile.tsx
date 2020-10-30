import { validate, register } from '@/api/profile'
import * as actionTypes from '@/store/action-types'
import { push } from 'connected-react-router'
import { RegisterValues } from '@/type/profile'
import { RegisterData } from '@/type/response'
import { message } from 'antd'

export default {
  validate() {
    return { type: actionTypes.VALIDATE, payload: validate() }
  },
  logout() {
    return (dispatch: any) => {
      sessionStorage.removeItem('token')
      dispatch(push('/login'))
    }
  },
  register(values: RegisterValues) {
    return (dispatch: any) => {
      (async function() {
        try {
          const result: RegisterData = await register<RegisterData>(values)
          if (result.success) {
            message.success(result.message)
            dispatch(push('/login'))
          } else {
            message.error('注册失败')
          }
        } catch (error) {
          console.log(error)
         message.error('注册失败') 
        }
      })()
    }
  }
}