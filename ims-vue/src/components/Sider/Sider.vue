<template lang="pug">
  .sider(
    :class="[darktheme ? 'dark-theme' : 'light-theme', siderFold && !isNavbar ? 'fold' : '']",
    v-show="!isNavbar"
  )
    p sider
    button(@click="toggleTheme") switch
</template>

<script>
  export default {
    name: 'sider',
    data () {
      return {

      }
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
      }
    },
    methods: {
      toggleTheme () {
        this.$store.commit('switchTheme')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  .sider{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: $sider-width;
    height: 100%;
    box-shadow: 0 2px 20px $shadow-sider-color;
    transition: all .3s;

    &.fold{
      width: $sider-fold-width;
    }

    &.float-menu{
      display: none;
    }

    &.dark-theme{
      background-color: $dark-theme-bg-color;
      color: $dark-theme-font-color;
    }

    &.light-theme{
      background-color: $light-theme-bg-color;
      color: $light-theme-font-color;
    }

  }
</style>
