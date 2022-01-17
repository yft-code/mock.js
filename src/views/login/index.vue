<template>
  <div class="login-container">
    <!-- 登录页面 el-form-->
    <el-form v-if="show==='login'" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-row type="flex" justify="space-between">
        <el-col class="welcomeLogin"><div>欢迎登录</div></el-col>
        <el-col class="register"><a @click="handleRegister">注册账户</a></el-col>
      </el-row>
      <!-- 警告提示 -->
      <el-alert v-if="isShowErrorMessage" :title="errorMessage" type="error" show-icon :closable="false" />
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号/邮箱"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password" class="passwordStyle">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
        />
      </el-form-item>

      <!-- 验证码 -->
      <div class="verificationContent">
        <el-form-item prop="verificationCode" class="vertify">
          <el-input
            ref="verificationCode"
            v-model="loginForm.verificationCode"
            placeholder="验证码"
            name="verificationCode"
            tabindex="3"
            autocomplete="on"
          />
        </el-form-item>
        <div class="verificationCodeImg">
          <div class="ValidCode disabled-select" :style="`width:${width}; height:${height}`" @click="refreshCode">
            <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{ item.code }}</span>
          </div>
        </div>
      </div>

      <el-row type="flex" justify="space-between">
        <el-col><el-form-item>
          <el-checkbox
            ref="rememberMe"
            v-model="loginForm.rememberMe"
          >记住用户信息</el-checkbox>
        </el-form-item></el-col>
        <el-col class="forgetPass"><span @click="handleForgetPass">忘记密码</span></el-col>
      </el-row>
      <el-button :loading="loading" type="primary" class="loginButton" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
    <!-- 忘记密码页面 ForgetPass-->
    <ForgetPass v-if="show==='forgetPass'" @handleBack="handleBackFunc" />
    <Register v-if="show==='register'" @handleBack="handleBackFunc" />
    <RegisterSuccess v-if="show==='registerSuccess'" @handleBack="handleBackFunc" />
  </div>
</template>
<script>

import ForgetPass from './forgetPass'
import Register from './register'
import RegisterSuccess from './registerSuccess'

export default {
  name: 'Login',
  components: { ForgetPass, Register, RegisterSuccess },
  props: {
    width: {
      type: String,
      default: '102px'
    },
    height: {
      type: String,
      default: '38px'
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data() {
    // 账号校验
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号/邮箱！'))
      } else {
        callback()
      }
    }
    // 密码校验
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码！'))
      } else if (!value) {
        callback(new Error('密码输入错误！'))
      } else {
        callback()
      }
    }
    // 验证码校验
    const validateCode = (rule, value, callback) => {
      let newVal = ''
      this.codeList.map(item => {
        newVal += item.code
      })
      if (value !== newVal) {
        callback(new Error('验证码输入错误！'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: '',
        verificationCode: '',
        rememberMe: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        verificationCode: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      otherQuery: {},
      codeList: [],
      isShowErrorMessage: false,
      errorMessage: '',
      show: 'login'

    }
  },
  created() {

  },
  mounted() {
    this.createdCode()
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  methods: {
    // 切换页面 - 默认切回登录页面
    handleBackFunc(val) {
      this.show = val || 'login'
    },
    handleRegister() {
      this.show = 'register'
    },
    // 忘记密码
    handleForgetPass() {
      this.show = 'forgetPass'
    },
    // 刷新验证码
    refreshCode() {
      this.createdCode()
    },
    // 创建随机数
    createdCode() {
      const len = this.length
      const codeList = []
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        const rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
        })
      }
      // 指向
      this.codeList = codeList
      // 将当前数据派发出去
      this.$emit('update:value', codeList.map(item => item.code).join(''))
    },
    // 获取验证码样式
    getStyle(data) {
      return `color: ${data.color}; font-size:18px; padding: ${data.padding}; transform: ${data.transform}`
    },
    // 登录 user/login
    handleLogin() {
      console.log('2222')
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {}
          params.password = this.loginForm.password
          params.rememberMe = this.loginForm.rememberMe || true
          params.username = this.loginForm.username
          this.$store.dispatch('user/login', params)
            .then(() => {
              this.$router.push({ name: 'Page', path: '/page' })
              sessionStorage.setItem('currentType', 'default')
              this.loading = false
            })
            .catch((res) => {
              this.isShowErrorMessage = true
              this.errorMessage = res.message
              this.loading = false
            })
        } else {
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped >
::v-deep .el-input__inner {
    height: 42px !important;
    line-height: 42px !important;
  }
.login-container {
  height: 100%;
  width: 100%;
  background-image:url("~@/assets/loginBack.png");
  background-size: 100% 100%;
  position: fixed;
  .passwordStyle{
      margin-bottom: 10px !important;
  }
  .el-alert--error.is-light{
    background-color: transparent;
    margin-bottom: 12px;
    padding: 0px;
  }
  .login-form {
    position: absolute;
    width: 336px;
    top: 25%;
    right: 16%;
    .welcomeLogin{
      width: 96px;
      height: 16px;
      font-size: 24px;
      font-weight: 400;
      text-align: left;
      color: #000;
      line-height: 32px;
      margin-bottom: 30px;
    }
    .register{
      width: 56px;
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      text-align: right;
      color: #0a69f2;
      line-height: 22px;
      margin-bottom: 20px;
      margin-top:4px;
    }
    .loginButton{
      width: 100%;
      height: 56px;
      background: #0a69f2;
      border-radius: 6px;
      font-size: 22px;
      font-weight: 400;
      color: #fff;
    }
    .verificationContent{
        display: inline-flex;
    }
    .vertify{
      .el-input {
        width:202px;
      }
    }
    .verificationCodeImg{
      width:108px;
      margin-left: 23px;
      height: 38px;
      line-height: 38px;
      margin-top:2px;
      background-image:url("~@/assets/verifyCodeImg.png");
    }
    .forgetPass{
        cursor: pointer;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        color: #666;
        line-height: 19px;
        margin-top:8px;
    }
  }

     .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        cursor: pointer;
        user-select: none;
      }
    }
.ValidCode{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span{
          display: inline-block;
        }
      }

</style>
