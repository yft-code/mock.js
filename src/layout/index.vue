<template>
  <div class="app-wrapper">
    <TopBar class="topbar-container" @changeUrl="getUrl" @changeCurrentMenu="getCurrentMenu" />
    <!-- 路由渲染的地方 -->
    <app-main :name="name" :type="type" :menu="menu" />
  </div>
</template>

<script>
import { TopBar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    TopBar
  },
  data() {
    return {
      name: 'default',
      type: 'default',
      menu: 'dashboard'
    }
  },
  methods: {
    getUrl(name, type) {
      this.name = name
      this.type = type
    },
    getCurrentMenu(menu) {
      this.menu = menu
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
