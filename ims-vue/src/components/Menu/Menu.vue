<template lang="pug">
  .menu
    i-menu(:theme="darktheme ? 'dark' : 'light'", active-name="", :open-names="[]")
      template(v-for="(item, index) in $store.state.app.menuList", v-if="item.children")
        sub-menu.m-item(v-for="(list, i) in item.children", :key="index", :name="list._id")
          template(slot="title")
            Icon(type="arrow-up-a")
            span {{ item.label }}
          menu-item(:name="list._id")
            Icon(type="laptop")
            span {{ list.label }}
      template(v-else)
        menu-item.m-item(:name="item._id")
          Icon(type="laptop")
          span {{ item.label }}
</template>

<script>
  import Icon from 'iview/src/components/icon'
  import Menu from 'iview/src/components/menu/menu'
  import MenuItem from 'iview/src/components/menu/menu-item'
  import Submenu from 'iview/src/components/menu/submenu'
  export default {
    name: 'menu',
    components: {
      'i-menu': Menu,
      'menu-item': MenuItem,
      'sub-menu': Submenu,
      Icon
    },
    mounted () {
      console.log('-------------')
      console.log(this.$store.state.app.menuList)
    },
    props: {
      darktheme: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .menu{
    span,i{
      vertical-align: middle;
    }
    .m-item{
      // background-color: $dark-theme-bg-color;
      // &.ivu-menu-opened{
      //   background-color: $dark-theme-bg-color;
      //   .ivu-menu-submenu-title{
      //     background-color: $dark-theme-bg-color;
      //   }
      // }
    }
  }
</style>
