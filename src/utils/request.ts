/*
 * @Description: Stay hungry，Stay foolish
 * @Author: xxx
 * @Date: 2023-07-16 12:11:32
 * @LastEditors: xxx
 * @LastEditTime: 2023-07-16 14:53:42
 */
// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 6000,
})

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.token = userStore.token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    console.log('request.interceptors.response-response===', response)
    let { code: status, msg } = response.data
    if (status === 200) return Promise.resolve(response.data)
    let message = ''
    switch (status) {
      case 401:
        message = 'token失效'
        break
      case 201:
      case 500:
        message = msg
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(response.data)
  },
  (error) => {
    console.log('request.interceptors.response-error===', error)
    let message = ''
    let { status, statusText } = error.response
    switch (status) {
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器异常'
        break
      default:
        message = `${status} ${statusText}` || '网络异常'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request