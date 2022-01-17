<template>
  <div class="app-container page-container">
    <div class="clearfix">
      <div class="info-container">
        <span class="display_name">{{ title }}</span>
        <div>登录</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Page',
  components: { },
  data() {
    return {
      title: 'myProject'
    }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
</style>
