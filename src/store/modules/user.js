import { login, logout, forgetPass, register } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  name: '',
  userInfo: JSON.parse(sessionStorage.getItem(`userInfo`)) || {}
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(response => {
        const { userDto } = response
        console.log('res', response)
        // 记住用户信息 - 记住—》存localStorage中，不记住则下次打开就消失（sessionStorage中存储）
        if (rememberMe === true) {
          localStorage.setItem('token', userDto.jwtToken)
        } else {
          sessionStorage.setItem('token', userDto.jwtToken)
        }
        commit('SET_NAME', userDto.realName)
        sessionStorage.setItem('userInfo', JSON.stringify(userDto))
        state.userInfo = userDto
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 注册
  register({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 忘记密码
  forgetPass({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      forgetPass({ ...userInfo }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 注销 - 登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      logout(token).then(() => {
        // 去掉token
        sessionStorage.setItem('token', '')
        localStorage.setItem('token', '')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
