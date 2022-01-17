<template>
  <div class="app-container features-container">
    {{name}}
  </div>
</template>

<script>

export default {
  name: 'Features',
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
      title:'features',
    }
  },
}
</script>
