<template>
  <div class="forgetPass-form">
    <el-form ref="forgetPassForm" :model="forgetPassForm" :rules="forgetPassRules" class="forgetPass-form" autocomplete="on" label-position="left">
      <div class="title">忘记密码</div>
      <!-- 警告提示 -->
      <el-alert class="alertStyle" title="请使用您注册时的手机号，接收验证码。" type="warning" show-icon :closable="false" />
      <el-row :gutter="1" class="searchPhoneStyle">
        <el-col :span="6">
          <el-form-item>
            <div>
              <div>
                <el-select
                  v-model="searchPhone"
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
          <el-form-item prop="forgetmobile">
            <el-input
              ref="forgetmobile"
              v-model="forgetPassForm.forgetmobile"
              placeholder="请输入手机号"
              name="forgetmobile"
              type="text"
              tabindex="4"
              autocomplete="on"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="verificationContent">
        <el-form-item prop="phone" class="vertify">
          <el-input
            ref="phone"
            v-model="forgetPassForm.phone"
            placeholder="请输入手机验证码"
            name="phone"
            tabindex="3"
            autocomplete="on"
          />
        </el-form-item>
        <div><el-button type="primary" class="sendButton">发送手机验证码</el-button></div>
      </div>
      <el-form-item prop="forgetPassword">
        <el-input
          ref="forgetPassword"
          v-model="forgetPassForm.forgetPassword"
          placeholder="新密码"
          name="forgetPassword"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input
          ref="rePassword"
          v-model="forgetPassForm.rePassword"
          placeholder="确认密码"
          name="rePassword"
          type="text"
          tabindex="2"
          autocomplete="on"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" class="forgetPassButton" @click.native.prevent="handleRepassword">确定</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'ForgetPass',
  data() {
    // 手机号校验
    const validateForgetmobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册的手机号！'))
      } else {
        callback()
      }
    }
    // 账号校验
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机验证码！'))
      } else {
        callback()
      }
    }
    // 密码校验
    const validateForgetPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码！'))
      } else {
        callback()
      }
    }
    // 密码重复校验
    const validateRePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次确认密码！'))
      } else {
        callback()
      }
    }
    return {
      forgetPassForm: {
        forgetmobile: '',
        phone: '',
        forgetPassword: '',
        rePassword: ''
      },
      forgetPassRules: {
        forgetmobile: [{ required: true, trigger: 'blur', validator: validateForgetmobile }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        forgetPassword: [{ required: true, trigger: 'blur', validator: validateForgetPassword }],
        rePassword: [{ required: true, trigger: 'blur', validator: validateRePassword }]
      },
      loading: false,
      searchPhone: '+86',
      options: ['+86', '+101']
    }
  },
  methods: {
    // 忘记密码 - 确定重置
    handleRepassword() {
      this.$refs.forgetPassForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {}
          params.phoneValidate = this.forgetPassForm.phone
          params.password = this.forgetPassForm.forgetPassword
          params.rePassword = this.forgetPassForm.rePassword
          this.$store.dispatch('user/forgetPass', params)
            .then(() => {
              // 回到登录页
              this.$emit('handleBack', '')
              this.loading = false
            })
            .catch((res) => {
              // 回到登录页
              this.$emit('handleBack', '')
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
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input__inner {
     height: 42px !important;
     line-height: 42px !important;
    }
     ::v-deep .el-alert__icon {
     color:#0A69F2 !important;
    }

    .alertStyle{
      margin-bottom: 4px !important;
    }
    .forgetPass-form{
        position: absolute;
        width: 320px;
        top: 25%;
        right: 15%;
        .searchPhoneStyle{
          .el-form-item{
            margin:8px 0px !important;
          }
        }
     .el-alert--warning.is-light{
        background-color: transparent;
        margin-bottom: 0px;
        padding: 0px;
        color:#666;
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
      .verificationContent{
        display: inline-flex;
    }
      .vertify{
        .el-input {
          width:186px;
        }
    }
    .sendButton{
        width: 114px;
        height: 40px;
        background: #0a69f2;
        border-radius: 2px;
        margin-left: 20px;
    }
    .el-button--medium{
      padding:10px 5px;
    }
    .forgetPassButton{
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
