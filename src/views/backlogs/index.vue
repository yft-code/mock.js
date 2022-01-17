<template>
  <div class="app-container backLogs-container">
    {{name}}
  </div>
</template>

<script>

export default {
  name: 'BackLogs',
  components: {},
  props:{
    menu:{
      type: String,
      default:''
    },
    name:{
      type: String,
      default:''
    },
  },
  data() {
    return {
      title:'BackLogs',
    }
  },
}
</script>
