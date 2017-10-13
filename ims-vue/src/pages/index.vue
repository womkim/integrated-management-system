<template lang="pug">
  .app
    Navigation
    Sider
    keep-alive
        router-view.main(:style="$store.state.app.isNavbar ? 'margin-left: 0;' : $store.state.app.siderFold ? 'margin-left: 42px;' : 'margin-left: 224px;'")
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
    .main{
      position: relative;
      margin-top: 46px;
      padding: 20px;
      overflow-y: auto;
      transition: all .3s;
    }
  }
</style>
