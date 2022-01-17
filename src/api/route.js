import request from '@/utils/request'
// 登录
export function getRouters(params) {
  return request({
    url: 'sys/getRouters',
    method: 'get',
    params
  })
}
