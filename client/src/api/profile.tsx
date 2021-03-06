import request from './index'
import { LoginValues, RegisterValues } from '@/type/profile'

export function validate() {
  return request.get('/user/validate')
}

export function register<T>(values: RegisterValues) {
  return request.post<T, T>('/user/register', values)
}

export function login<T>(values: LoginValues) {
  return request.post<T, T>('/user/login', values)
}
