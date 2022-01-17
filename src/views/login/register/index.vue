<template>
  <div class="register-form">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">
      <el-row type="flex" justify="space-between">
        <el-col class="welcomeLogin"><div>注册</div></el-col>
        <el-col class="register"><a @click="handleRegister">使用已有账户登录</a></el-col>
      </el-row>
      <el-form-item prop="registerUsername">
        <el-input
          ref="registerUsername"
          v-model="registerForm.registerUsername"
          placeholder="账号/邮箱"
          name="registerUsername"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-popover
        v-model="showPopPassword"
        placement="bottom"
        title=""
        width="272"
      >
        <div :class="{'redRoom':passwordLevel==='lower', 'greenRoom': passwordLevel==='higher'}">{{ passwordLevel==='lower'?'强度：太短':'强度：强' }}</div>
        <el-progress v-if="passwordLevel==='lower'" :percentage="30" status="exception"></el-progress>
        <el-progress v-if="passwordLevel==='higher'" :percentage="100" status="success"></el-progress>
        <p>请至少输入6个字符。请不要使用容易被猜到的密码。</p>
        <el-form-item slot="reference" prop="registerPassword">
          <el-input
            ref="registerPassword"
            v-model="registerForm.registerPassword"
            placeholder="6-16位密码，区分大小写"
            name="registerPassword"
            type="text"
            tabindex="2"
            autocomplete="on"
            @input="handleBlurPassword"
          />
        </el-form-item>
      </el-popover>
      <el-popover
        v-model="showPopRePassword"
        placement="bottom"
        title=""
        width="272"
      >
        <div :class="{'redRoom':repasswordLevel==='lower', 'greenRoom': repasswordLevel==='higher'}">{{ repasswordLevel==='lower'?'强度：太短':'强度：强' }}</div>
        <el-progress v-if="repasswordLevel==='lower'" :percentage="30" status="exception"></el-progress>
        <el-progress v-if="repasswordLevel==='higher'" :percentage="100" status="success"></el-progress>
        <p>请至少输入6个字符。请不要使用容易被猜到的密码。</p>
        <el-form-item slot="reference" prop="registerRePassword">
          <el-input
            ref="registerRePassword"
            v-model="registerForm.registerRePassword"
            placeholder="确认密码"
            name="registerRePassword"
            type="text"
            tabindex="3"
            autocomplete="on"
            @input="handleBlurRePassword"
          />
        </el-form-item>
      </el-popover>
      <el-row :gutter="1">
        <el-col :span="6">
          <el-form-item>
            <div>
              <div>
                <el-select
                  v-model="registerSearchPhone"
                  default-first-option
                  class="header-search-select"
                >
                  <el-option v-for="item in options" :key="item" :value="item" :label="item" />
                </el-select>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item prop="registerMobile">
            <el-input
              ref="registerMobile"
              v-model="registerForm.registerMobile"
              placeholder="请输入手机号"
              name="registerMobile"
              type="text"
              tabindex="4"
              autocomplete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button :loading="loading" type="primary" class="registerButton" @click.native.prevent="handleRepassword">注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'Register',
  data() {
    // 账号校验
    const validateRegisterUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号/邮箱！'))
      } else {
        callback()
      }
    }
    // 密码校验
    const validateRegisterPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    // 密码重复校验
    const validateRegisterRePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次确认密码！'))
      } else {
        callback()
      }
    }
    // 手机号校验
    const validateRegisterMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号！'))
      } else {
        callback()
      }
    }
    return {
      options: ['+86', '+101'],
      registerForm: {
        registerUsername: '',
        registerPassword: '',
        registerRePassword: '',
        registerMobile: ''
      },
      registerRules: {
        registerUsername: [{ required: true, trigger: 'blur', validator: validateRegisterUsername }],
        registerPassword: [{ required: true, trigger: 'blur', validator: validateRegisterPassword }],
        registerRePassword: [{ required: true, trigger: 'blur', validator: validateRegisterRePassword }],
        registerMobile: [{ required: true, trigger: 'blur', validator: validateRegisterMobile }]
      },
      loading: false,
      registerSearchPhone: '+86',
      showPopPassword: false,
      passwordLevel: 'lower',
      showPopRePassword: false,
      repasswordLevel: 'lower'
    }
  },
  methods: {
    // 点击使用已有账户登录 - 回到登录页
    handleRegister() {
      this.$emit('handleBack', '')
    },
    // 点击注册
    handleRepassword() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {}
          params.username = this.registerForm.registerUsername
          params.password = this.registerForm.registerPassword
          params.rePassword = this.registerForm.registerRePassword
          this.$store.dispatch('user/register', params)
            .then(() => {
              // 跳转到注册成功页面
              this.$emit('handleBack', 'registerSuccess')
              // 跳转到注册成功页面
              this.loading = false
            })
            .catch((res) => {
              // 跳转到注册成功页面
              this.$emit('handleBack', 'registerSuccess')
              Message({
                message: '重置密码失败!',
                type: 'error',
                duration: 5 * 1000
              })
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    // 密码的文本改变事件
    handleBlurPassword(val) {
      this.showPopPassword = true
      this.showPopRePassword = false
      // 至少输入6个字符,小于6个字符则提示过短
      if (val.length < 6) {
        this.passwordLevel = 'lower'
      } else {
        this.passwordLevel = 'higher'
      }
    },
    // 确认密码的文本改变事件
    handleBlurRePassword(val) {
      this.showPopRePassword = true
      this.showPopPassword = false
      // 至少输入6个字符,小于6个字符则提示过短
      if (val.length < 6) {
        this.repasswordLevel = 'lower'
      } else {
        this.repasswordLevel = 'higher'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input__inner {
     height: 42px !important;
     line-height: 42px !important;
    }
    ::v-deep .el-progress__text{
      display: none !important;
    }
    .redRoom{
      color: #F56C6C;
    }
    .greenRoom  {
      color: #00B58A;
    }
    .register-form{
        position: absolute;
        width: 320px;
        top: 25%;
        right: 15%;
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
      width: 112px;
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      text-align: right;
      color: #0a69f2;
      line-height: 22px;
      margin-top:3px;
      }
    .title{
        width: 96px;
        height: 32px;
        font-size: 24px;
        font-weight: 400;
        text-align: left;
        color: #000;
        line-height: 32px;
        margin-bottom: 15px;
    }
    .el-button--medium{
      padding:10px 5px;
    }
    .registerButton{
      width: 100%;
      height: 52px;
      background: #0a69f2;
      border-radius: 6px;
      font-size: 22px;
      font-weight: 400;
      color: #fff;
    }
 }
</style>
