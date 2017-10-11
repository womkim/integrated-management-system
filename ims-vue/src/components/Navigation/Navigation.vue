<template lang="pug">
  .nav(:class="{'no-menu': !siderFold && !isNavbar, 'nav-header': isNavbar}")
    .menu-btn(@click="foldMenu")
      i.iconfont(:class="isNavbar ? 'icon-bars': siderFold ? 'icon-menuunfold' : 'icon-menufold'")
    .right-wrapper
      .home-btn
        i.iconfont.icon-menufold
        span Home
      .user-menu
        .utitle
          i.iconfont.icon-menufold
          span {{ username }}
        ul.submenu
          li.item(@click="logout")
            span Sign out
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
      },
      username () {
        return this.$store.state.app.username
      }
    },
    methods: {
      foldMenu () {
        if (this.isNavbar) {
          console.log('fold sidebar')
        } else {
          this.$store.commit('switchSider')
          // this.$store.dispatch('switchSiderAsync')
        }
      },
      logout () {
        console.log('logout')
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
    line-height: $nav-height - 1px;
    background-color: $nav-bgcolor;
    color: $nav-color;
    font-size: 12px;
    box-shadow: 0 0 20px $shadow-nav-color;
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
      text-align: center;
      cursor: pointer;

      .iconfont{
        font-size: 18px;
      }

    }

    .right-wrapper{
      display: flex;
      align-items: center;
      padding-right: 16px;
      height: $nav-height - 1px;
      text-align: center;

      .home-btn{
        padding: 0 20px 2px;
        cursor: pointer;
        transition: all .4s;
        &:hover{
          background-color: $nav-hover-bgcolor;
          color: $nav-hover-color;
        }
      }

      .user-menu{
        position: relative;
        border-bottom: 2px solid transparent;
        &:hover{
          border-bottom: 2px solid $nav-hover-color;
          .submenu{
            height: $nav-height - 5px;
            transform: translate3d(0, 0, 0);
          }
        }
      }

      .utitle{
        &:hover{
          color: $nav-hover-color;
        }
        padding: 0 20px;
        cursor: pointer;
        transition: all .4s;
      }

      .submenu{
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        margin-top: 5px;
        height: 0;
        min-width: 100%;
        overflow: hidden;
        border-radius: $default-radius;
        background-color: #fff;
        transform: translate3d(0, 10px, 0);
        transition: all .4s;

        &:hover{
          color: $nav-hover-color;
          cursor: pointer;
        }

        .item{
          padding: 0 20px;
          line-height: $nav-height - 5px;
          text-align: left;
        }
      }

      .iconfont{
        font-size: 12px;
      }

      span{
        margin-left: 6px;
      }

    }

  }
</style>
