<template>
  <div class="app-container taskboard-container">
    {{name}}
  </div>
</template>

<script>

export default {
  name: 'Taskboard',
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
      title:'taskboard',
    }
  },
}
</script>
