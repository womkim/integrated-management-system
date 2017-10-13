<template lang="pug">
  ul.v-menu
    li(v-for="(item, index) in listdata", :key="index", :class="item.children ? 'submenu' : 'menu-item'")
      router-link(:to="item.uri",
                  :style="siderFold ? 'padding: 0 4px 0 12px;' : ''",
                  v-if="!item.children", @click.native="toggle(item._id)",
                  :title="siderFold ? item.label : ''")
        i.iconfont(:class="item.icon", :style="siderFold ? 'font-size: 18px;' : ''")
        span(v-show="!siderFold") {{ item.label }}
      div(v-else, :class="{'open': $store.state.app.menuOpenId === item._id}")
        .submenu-title(:style="siderFold ? 'padding: 0 4px 0 12px;' : ''",
                      :class="{'with-arrow': !siderFold}",
                      @click="toggle(item._id)",
                      :title="siderFold ? item.label : ''")
          i.iconfont(:class="item.icon", :style="siderFold ? 'font-size: 18px;' : ''")
          span(v-show="!siderFold") {{ item.label }}
        ul.v-menu(v-show="$store.state.app.menuOpenId === item._id")
          li.menu-item(v-for="(list, i) in item.children", :key="i")
            router-link(:to="list.uri", :style="siderFold ? 'padding: 0 4px 0 12px;' : ''", :title="siderFold ? list.label : ''")
              i.iconfont(:class="list.icon", :style="siderFold ? 'font-size: 18px;' : ''")
              span(v-show="!siderFold") {{ list.label }}
</template>

<script>
  export default {
    name: 'menu',
    data () {
      return {
        list: []
      }
    },
    props: {
      siderFold: {
        type: Boolean
      }
    },
    computed: {
      listdata () {
        return this.$store.state.app.menuList
      }
    },
    methods: {
      toggle (id) {
        this.$store.commit('toggleMenu', id)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  .v-menu{
    height: 100%;
    line-height: 46px;
    background-color: #fff;
    color: #666;

    .menu-item, .submenu-title{
      font-size: 12px;
      height: 42px;
      line-height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover{
        color: $sider-hover-color;
        transition: color .3s;
        cursor: pointer;
      }
    }
    .submenu-title{
      padding-left: 16px;
    }
    .with-arrow{
      position: relative;
      font-family:"iconfont" !important;
      font-size:12px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:after{
        content: '\e603';
        position: absolute;
        top: 0;
        right: 10px;
        transform: rotate(0deg);
        transition: all .3s;
      }
    }

    .open{
      .with-arrow{
        &:after{
          transform: rotate(-180deg);
        }
      }
    }

    .iconfont{
      font-size: 14px;
      margin-right: 8px;
      transition: all .3s;
    }

    a{
      display: block;
      padding: 0 16px;
    }

  }

  .submenu .v-menu{
    transition: all .3s;
    a{
      padding-left: 32px;
    }
  }
</style>
