import axios from 'axios'

// 登录接口处理
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})

// 请求方法处理
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      config.headers['Authorization'] = sessionStorage.getItem('token') || localStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) 
    return Promise.reject(error)
  }
)

// 返回响应处理
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // 后台返回的报错信息
      console.log('error logMsg',res.resultLog.logMsg) 
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('error',error)
    return Promise.reject(error)
  }
)

export default service
