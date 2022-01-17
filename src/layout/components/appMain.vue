<template>
  <section class="app-main">
    <Dashboard v-if="menu==='dashboard'" :name="name" />
    <Planning v-if="menu==='planning'" :name="name" />
    <TaskBoard v-if="menu==='taskBoard'" :name="name" />
    <Backlogs v-if="menu==='backlogs'" :name="name" />
    <Features v-if="menu==='features'" :name="name" />
    <Page v-if="menu==='default'" />
  </section>
</template>

<script>
import Dashboard from '../../views/dashboard'
import Planning from '../../views/planning'
import TaskBoard from '../../views/taskBoard'
import Backlogs from '../../views/backlogs'
import Features from '../../views/features'
import Page from '../../views/page'

export default {
  name: 'AppMain',
  components: { Dashboard, Planning, TaskBoard, Backlogs, Features, Page },
  props: {
    menu: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f7f7fb;
}
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
