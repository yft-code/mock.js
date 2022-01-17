
module.exports = [
    // 登录
    {
      url: 'sys/getRouters',
      type: 'get',
      response: res => {
        return {
          "code": 200,
          "resultLog": {
              "logMsg": "成功"
          },
          "dataTime": "2021-06-07 14:00:31",
          "message": "",
          "list":[
              {name:'login',path:'/login',components:'@/views/login/index'}
          ]
          }
     }
    }
  ]
  