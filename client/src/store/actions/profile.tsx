import { validate, register, login } from '@/api/profile'
import * as actionTypes from '@/store/action-types'
import { push } from 'connected-react-router'
import { RegisterValues, LoginValues } from '@/type/profile'
import { RegisterData, LoginData } from '@/type/response'
import { message } from 'antd'

export default {
  validate() {
    // redux-promise
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
  },
  loginAction(values: LoginValues) {
    return (dispatch: any) => {
      (async function() {
        try {
          const result: LoginData = await login<LoginData>(values)
          if (result.success) {
            sessionStorage.setItem('token', result.data)
            dispatch(push('/profile'))
          } else {
            message.error('登录失败')
          }
        } catch (error) {
          console.log(error)
          message.error('登录失败') 
        }
      })()
    }
  },
  setAvatar(avatar: string) {
    return { type: actionTypes.SET_AVATAR, payload: avatar }
  }
}