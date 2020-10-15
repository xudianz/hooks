import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://localhost:8001'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf8'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem('token')
  if (token)
    config.headers['authorization'] = `Bearer ${token}`
  return config
}, err => Promise.reject(err))

axios.interceptors.response.use(response => response.data, error => {
  return Promise.reject(error)
})

export default axios