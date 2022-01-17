<template>
  <div class="app-container dashboard-container" @click="getRouters">
    {{ name }}
  </div>
</template>

<script>
import * as api from '@/api/route'
export default {
  name: 'Dashboard',
  components: {},
  props: {
    menu: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: 'dashboard'
    }
  },
  methods: {
    getRouters() {
      api.getRouters().then(res => {
        console.log('路由', res)
      }).catch()
    }
  }
}
</script>
