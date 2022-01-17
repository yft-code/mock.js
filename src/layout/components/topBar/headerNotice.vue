<template>
  <div>
    <div slot="content">
      <span class="header-notice" @click="fetchNotice">
        <i class="el-icon-message-solid" />
      </span>
    </div>
    <el-popover
      trigger="click"
      placement="bottom"
      visible-arrow="false"
      overlay-class-name="header-notice-wrapper"
      @visibleChange="handleHoverChange"
    >
    </el-popover>
  </div>
</template>
<script>

export default {
  name: 'HeaderNotice',
  components: {
  },
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    // msgTotal() {
    //   return parseInt(this.msg1Count) + parseInt(this.msg2Count)
    // },
  },
  mounted() {

  },
  destroyed: function() {
    // 离开页面生命周期函数
  },
  methods: {
    fetchNotice() {
      this.hovered = true
    },
    handleHoverChange(visible) {
      this.hovered = visible
    }
  }
}
</script>

<style lang="scss" scoped>
.header-notice-wrapper {
  top: 50px !important;
}
.header-notice {
  line-height: 52px;
  display: inline-block;
  transition: all 0.3s;
  span {
    vertical-align: initial;
  }
}
</style>
