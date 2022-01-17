import request from '@/utils/request'
import requestLogin from '@/utils/requestLogin'

// 登录
export function login(data) {
  return requestLogin({
    url: 'sys/login',
    method: 'post',
    data
  })
}
// 注册
export function register(data) {
  return request({
    url: 'sys/register',
    method: 'post',
    data
  })
}

// 忘记密码
export function forgetPass(data) {
  return request({
    url: 'sys/forgetPass',
    method: 'post',
    data
  })
}

// 注销
export function logout(logoutToken) {
  return request({
    url: 'sys/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': logoutToken
    }
  })
}

