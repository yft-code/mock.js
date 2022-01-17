<template>
  <div class="app-container planning-container">
    {{name}}
  </div>
</template>

<script>

export default {
  name: 'Planning',
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
      title:'Planning',
    }
  },
}
</script>
