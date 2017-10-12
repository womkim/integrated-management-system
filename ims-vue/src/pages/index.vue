<template lang="pug">
  .app
    Navigation
    Sider
    router-view.main(:style="$store.state.app.siderFold ? 'margin-left: 42px;' : ''")
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
      margin: 46px 0 0 224px;
      padding: 20px;
      overflow-y: auto;
      transition: all .3s;
    }
  }
</style>
