<template lang="pug">
  .app
    Sider
    .main(:style="$store.state.app.isNavbar ? 'margin-left: 0;' : $store.state.app.siderFold ? 'margin-left: 42px;' : 'margin-left: 224px;'")
      Navigation
      keep-alive
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
    .main{
      position: relative;
      margin-top: 46px;
      padding: 20px;
      overflow-y: visible;
      transition: all .3s;
      @media only screen and (max-width: 376px) {
        padding: 5px;
      }
    }
  }
</style>
