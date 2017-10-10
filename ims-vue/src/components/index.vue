<template lang="pug">
  .app
    Navigation
    Sider
    router-view
</template>

<script>
  import Navigation from '@/components/Navigation/Navigation'
  import Sider from '@/components/Sider/Sider'
  export default {
    name: 'app',
    components: {
      Navigation,
      Sider
    }
  }
</script>

<style lang="scss">
  .app{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
