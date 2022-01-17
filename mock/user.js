
module.exports = [
  // 登录
  {
    url: 'sys/login',
    type: 'post',
    response: res => {
      return {
        "code": 200,
        "resultLog": {
            "logMsg": "成功"
        },
        "dataTime": "2021-06-07 14:00:31",
        "message": "",
        "userDto": {
            "account": "tom",
            "password": null,
            "passwordRep": null,
            "qq": "273172073",
            "phone": "13813385093",
            "email": "273172073@qq.com",
            "photoUrl": null,
            "realName": 'admin',
            "realId": null,
            "enabled": true,
            "accountNonExpired": true,
            "credentialsNonExpired": true,
            "accountNonLocked": true,
            "lastIp": null,
            "jwtToken": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0b20iLCJBdXRob3JpdHkiOltdLCJpc3MiOiJza3l3YXRjaCIsImV4cCI6MTYyMzY1MDQzMSwiaWF0IjoxNjIzMDQ1NjMxfQ.nzGGH8Wc2GRXpaoacvboQ4RtmI3PxMBovwPEG6rVx8gRCEH0iROuzrAvK30ce4QA3VSeun4F21H3H6ri5_RaFg"
         }
        }
   }
  },
  //注册
  {
    url: 'sys/register',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        result: 'success',
        message: "注册成功！",
        success: true
      }
    }
  },

  // 登出
  {
    url: 'sys/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        result: 'success',
        message: "退出登录成功！",
        success: true
      }
    }
  }
]
