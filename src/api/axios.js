/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
// import service from 'axios'
import axios from 'axios'
import QS from 'qs'
// import { Toast } from 'vant'
import router from '@/router'
import store from '../store/index'
let serviceConfig = 'http://192.168.31.159:8090' // 'http://192.168.31.88:8080'

// const axios = service.create({
//   baseURL: serviceConfig // api的base_url
//   /* baseURL: "http://192.168.0.107:9090", */ // api的base_url
// })
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'api' // 'api'
  //   axios.defaults.baseURL = 'api'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = serviceConfig
  //   axios.defaults.baseURL = '/api'
}

// 请求超时时间
axios.defaults.timeout = 2000

// post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.patch['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.patch['Authorization'] = 'Basic YWRtaW46YWRtaW4='
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.withCredentials = true
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          this.$Modal.info({
            content: '登录过期，请重新登录',
            duration: 1
          })
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        // 404请求不存在
        case 404:
          this.$Modal.erro({
            content: '网络请求不存在',
            duration: 1
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          this.$Modal.erro({
            content: error.response.data.message,
            duration: 1.5
          })
      }
      return Promise.reject(error.response)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(...params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export const delet = url => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export const patch = (url, params) => {
  var formData = new FormData()
  formData.append('username', params.username)
  formData.append('password', params.password)
  return new Promise((resolve, reject) => {
    axios
      .patch(url, formData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
