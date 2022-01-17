<template>
  <div class="registerSuccess-form">
    <img :src="img" width="64" height="64" class="el-img">
    <div class="registerMessage">你的账户：注册成功</div>
    <el-button type="primary" @click.native.prevent="handlebackLogin">返回登录页</el-button>
  </div>
</template>
<script>
import img from '@/assets/successRegister.png'
export default {
  name: 'RegisterSuccess',
  data() {
    return {
      img: img
    }
  },
  methods: {
    handlebackLogin() {
      // 回到登录页面
      this.$emit('handleBack', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.registerSuccess-form{
    position: absolute;
    width: 320px;
    top: 25%;
    right: 12%;
  .registerMessage{
    width: 180px;
    height: 28px;
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    color: rgba(0,0,0,0.85);
    line-height: 28px;
    margin:15px 0px 28px -34px;
  }
  .el-img{
         padding:8px;
         margin-left:20px;
     }
}

</style>
