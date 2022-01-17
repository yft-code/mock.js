import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})

// 请求方法处理
service.interceptors.request.use(
  config => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
    // 部分传参需要所有接口都共用的，需要放在请求体传给后台 例如：account
    config.data&&(config.data['account'] = userInfo.account);
    // do something before request is sent
    if (sessionStorage.getItem('token') || localStorage.getItem('token')) {
      config.headers['Authorization'] = sessionStorage.getItem('token') || localStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 返回响应处理
service.interceptors.response.use(

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     // store.dispatch('user/resetToken').then(() => {
      //     //   location.reload()
      //     // })
      //   })
      // }
        // 后台返回的报错信息
      console.log('error logMsg',res.resultLog.logMsg) 
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
