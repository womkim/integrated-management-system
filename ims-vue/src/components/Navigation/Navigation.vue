<template lang="pug">
  .nav(:class="{'no-menu': !siderFold && !isNavbar, 'nav-header': isNavbar}")
    .menu-btn(@click="handClick")
      i.iconfont(:class="isNavbar ? 'icon-bars': siderFold ? 'icon-menuunfold' : 'icon-menufold'")
    .right-link
</template>

<script>
  export default {
    name: 'nav',
    mounted () {
      this.$store.dispatch('initial')
    },
    computed: {
      siderFold () {
        return this.$store.state.app.siderFold
      },
      isNavbar () {
        return this.$store.state.app.isNavbar
      }
    },
    methods: {
      handClick () {
        if (this.isNavbar) {
          console.log('fold sidebar')
        } else {
          this.$store.commit('switchSider')
          // this.$store.dispatch('switchSiderAsync')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  .nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    left: $sider-fold-width;
    height: $nav-height;
    background-color: $nav-bgcolor;
    box-shadow: 0 0 20px $shadow-color;
    transition: all .3s;

    &.no-menu{
      left: $sider-width;
    }

    &.nav-header{
      left: 0;
    }

    .menu-btn{
      height: $nav-height;
      width: $nav-height;
      line-height: $nav-height;
      text-align: center;
      cursor: pointer;

      .iconfont{
        font-size: 18px;
      }

    }

  }
</style>
