<template lang="pug">
  .sider(
    :class="[darktheme ? 'dark-theme' : 'light-theme', siderFold && !isNavbar ? 'fold' : '']",
    v-show="!isNavbar"
  )

    //- 顶部logo
    .logo(@click="routerToHome")
      img(src="../../assets/images/logo.png", alt="logo", :class="{'mini-img': siderFold}")
      span(v-show="!siderFold") {{ $store.state.app.name}}

    //- menu菜单
    v-menu.sider-menu(:class="darktheme ? 'dark-theme' : 'light-theme'",
      :siderFold="siderFold")

    //- 底部切换主题
    .switch-theme(v-show="!siderFold", :class="{'light-switch': !darktheme}")
      div
        i.iconfont.icon-bulb
        span Switch Theme
      //- .switch-btn(@click="toggleTheme") pp
      v-switch(:checked="true", @onClick="toggleBtn", checkValue="Dark", unCheckValue="Light")
</template>

<script>
  import VSwitch from '@/components/Switch/Switch'
  import VMenu from '@/components/Menu/Menu'

  export default {
    name: 'sider',
    created () {
      this.$store.dispatch('loadMenuList')
    },
    components: {
      'v-switch': VSwitch,
      'v-menu': VMenu
    },
    computed: {
      siderFold () {
        return this.$store.state.app.siderFold
      },
      isNavbar () {
        return this.$store.state.app.isNavbar
      },
      darktheme () {
        return this.$store.state.app.darktheme
      },
      logo () {
        return this.$store.state.app.logo
      }
    },
    methods: {
      toggleTheme () {
        this.$store.commit('switchTheme')
      },
      toggleBtn (checked) {
        this.$store.commit('switchTheme')
      },
      routerToHome () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  .sider{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    width: $sider-width;
    height: 100%;
    box-shadow: 0 2px 20px $shadow-sider-color;
    transition: width .3s;

    &.fold{
      width: $sider-fold-width;
    }

    &.float-menu{
      display: none;
    }

    &.dark-theme{
      @include dark-theme
      .v-menu{
        @include dark-theme
      }
      .submenu .v-menu{
        background-color: #333;
      }
      .active{
        background-color: #494949;
      }
    }
    &.light-theme{
      @include light-theme
      .v-menu{
        @include light-theme
      }
      .active{
        background-color: $sider-hover-bgcolor;
      }
    }

    .active{
      color: $sider-hover-color;
    }


    .logo{
      margin: 20px 6px;
      padding: 10px 0;
      height: 40px;
      line-height: 40px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      transition: all .3s;

      img{
        width: 40px;
        margin-right: 8px;
        transition: all .3s;
      }
      .mini-img{
        width: 28px;
      }

    }

    .sider-menu{
      height: calc(100vh - 151px);
      overflow-x: hidden;

    }


    .switch-theme{
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0 16px 0 24px;
      width: 100%;
      line-height: 48px;
      border-top: 1px solid $dark-theme-bg-color;
      background-color: $dark-theme-bg-color + #101010;
      color: $dark-theme-font-color;
      font-size: 12px;
      white-space: nowrap;
      box-sizing: border-box;
      transition: all .3s;

      &.light-switch{
        border-top: 1px solid $light-theme-bg-color - #101010;
        background-color: $light-theme-bg-color + #101010;
        color: $light-theme-font-color;
      }

      .iconfont{
        font-size: 12px;
        margin-right: 4px;
      }

    }

  }

</style>
