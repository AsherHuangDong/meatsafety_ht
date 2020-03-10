<template>
  <div id="app">
    <router-view v-if="alive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      alive:true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods:{
     reload() {
      this.alive= false
      this.$nextTick(() => {
        this.alive = true
      })
  }
  }
}
</script>

<style>
  #app{
    overflow: visible;
  }
</style>
