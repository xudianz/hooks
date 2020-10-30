import { User } from './state'

export interface RegisterData {
  success: boolean,
  data: User,
  message: string
}