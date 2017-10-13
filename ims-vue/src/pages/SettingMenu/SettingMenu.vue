<template lang="pug">
  .setting-menu
    .m-modal-context(v-show="showContext", ref="modal", @contextmenu.stop.prevent="showContext=false")
      ul.m-context(ref="context")
        li.m-context-item(@click="addItem")
          i.iconfont.icon-setting
          span 添加
        li.m-context-item(v-show="chooseId", @click="editItem")
          i.iconfont.icon-setting
          span 编辑
        li.m-context-item(v-show="chooseId", @click="removeItem")
          i.iconfont.icon-setting
          span 删除
    .m-title
      span
      span 菜单名称
      span 图标名称
      span 链接
      span(style="text-align:center;") 菜单显示
      span(style="text-align:center;") 开发者可见
    ul.lvla
      li.lvla-list(v-for="(item, index) in menuList",
                  :key="index",
                  :class="[{'u-gutter': index % 2 !== 0, 'active': chooseId === item._id}]",
                  @click.stop.prevent="selectItem(item._id)",
                  @contextmenu.stop.prevent="openContextMenu(item._id, $event)")
        i.iconfont.lvla-list-item(:class="open[index] ? 'icon-folder-open' : 'icon-folder-close'",
                                  @click="toggleFold(index)")
        span.lvla-list-item {{ item.label }}
        span.lvla-list-item {{ item.icon }}
        span.lvla-list-item {{ item.uri }}
        span.lvla-list-item(style="text-align:center;") {{ item.isShow ? '是' : '否' }}
        span.lvla-list-item(style="text-align:center;") {{ item.isDevShow ? '是' : '否' }}
        ul.lvlb(v-show="item.children && open[index]")
          li.lvlb-list(v-for="(list, i) in item.children",
                      :key="i",
                      :class="[{'u-gutter': i % 2 === 0, 'active': chooseId === list._id}]",
                      @click.stop.prevent="selectItem(list._id)")
            i.iconfont.icon-file.lvlb-list-item
            span.lvlb-list-item {{ list.label }}
            span.lvlb-list-item {{ list.icon }}
            span.lvlb-list-item {{ list.uri }}
            span.lvlb-list-item(style="text-align:center;") {{ list.isShow ? '是' : '否' }}
            span.lvlb-list-item(style="text-align:center;") {{ list.isDevShow ? '是' : '否' }}


</template>

<script>
  export default {
    name: 'SettingMenu',
    data () {
      return {
        chooseId: '',
        showContext: false,
        open: ((self) => {
          const len = self.$store.state.app.menuList.length
          let obj = {}
          for (let i = 0; i < len; i++) {
            obj[`${i}`] = false
          }
          return obj
        })(this)
      }
    },
    beforeRouteEnter (to, from, next) {
      // console.log(to)
      // console.log(from)
      // if (this.$store.state.app.menuList.length === 0) {
      //   this.$store.dispatch('loadMenuList')
      // }
      next()
    },
    created () {
      window.document.addEventListener('click', () => {
        this.showContext = false
      })
    },
    computed: {
      menuList () {
        return this.$store.state.app.menuList
      }
    },
    methods: {
      selectItem (id = '') {
        this.chooseId = id
      },
      toggleFold (index) {
        this.open[index] = !this.open[index]
      },
      openContextMenu (id, el) {
        this.showContext = true
        const vmodal = this.$refs.modal.parentNode
        let pHeight = vmodal.offsetHeight
        let pWidth = vmodal.offsetWidth
        let mWidth = el.pageX - vmodal.offsetLeft
        let mHeight = el.pageY - vmodal.offsetTop
        if (mWidth > pWidth - 140) {
          mWidth = mWidth - 100
        }
        this.$nextTick(() => {
          if (mHeight > pHeight - 120) {
            mHeight = mHeight - this.$refs.context.offsetHeight
          }
          this.$refs.context.style.left = mWidth + 'px'
          this.$refs.context.style.top = mHeight + 'px'
        })
      },
      addItem () {
        this.$router.push(`/setting-menu/add/0`)
      },
      editItem () {
        this.$router.push(`/setting-menu/add/${this.chooseId}`)
      },
      removeItem () {
        alert('you will remove an menu item')
        this.$http('/api/removeMenuById', {
          method: 'post',
          params: {
            token: '123'
          },
          data: {
            id: this.chooseId
          }
        }).then(data => {
          console.log(data.data)
          this.$store.dispatch('loadMenuList')
        }).catch(e => {
          console.log(`-> an error occured: ${e.message}`)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/sass/_variables.scss';
  $table-bg-color: #fff;
  $table-color: #444;
  $border-color: #bbb;
  $hover-color: $sider-hover-color;
  $hover-bgcolor: $sider-hover-bgcolor;
  .setting-menu{
    font-size: 12px;
    .m-title{
      border: 1px solid $border-color;
      border-bottom: none;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #dcdcdc;
      color: #333;
      font-weight: 600;
      line-height: 40px;
      span{
        display: inline-block;
        width: calc((100% - 40px) / 5);
        // border-left: 1px solid $border-color;
        box-sizing: border-box;
        &:first-child{
          border-left: none;
          min-width: 40px;
          max-width: 40px;
        }
      }
    }
  }

  .u-gutter{
    background-color: rgba(225, 225, 225, .4);
  }

  .lvla{
    border: 1px solid $border-color;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: $table-bg-color;
    color: $table-color;
    font-size: 12px;
    user-select: none;
    &-list{
      // border-top: 1px solid $border-color;
      line-height: 36px;
      // &:first-child{
      //   border-top: none;
      // }
      // &.with-bottom{
      //   border-bottom: 1px solid $border-color;
      // }
      &-item{
        display: inline-block;
        padding-left: 10px;
        width: calc((100% - 40px) / 5);
        // border-left: 1px solid $border-color;
        box-sizing: border-box;
        &:first-child{
          // border-left: none;
          cursor: pointer;
        }
      }
      &.active{
        position: relative;
        background-color: $hover-bgcolor;
        &:after{
          content: '';
          position: absolute;
          top: 12px;
          left: 32px;
          width: 12px;
          height: 6px;
          border-left: 2px solid $hover-color;
          border-bottom: 2px solid $hover-color;
          transform: rotate(-45deg);
        }
      }
      .iconfont{
        min-width: 40px;
        max-width: 40px;
      }
    }
  }

  .lvlb{
    // margin-left: 40px;
    // width: calc(100% - 40px);
    // border: 1px solid $border-color;
    background-color: #ffecec;
    color: #555;
    &-list{
      // border-top: 1px solid $border-color;
      height: 36px;
      line-height: 36px;
      // &:first-child{
      //   border-top: none;
      // }
      &-item{
        display: inline-block;
        padding-left: 10px;
        width: calc((100% - 40px) / 5);
        // border-left: 1px solid $border-color;
        box-sizing: border-box;
        &:first-child{
          border-left: none;
          cursor: pointer;
        }
      }
      &.active{
        position: relative;
        background-color: $hover-bgcolor;
        &:after{
          content: '';
          position: absolute;
          top: 12px;
          left: 32px;
          width: 12px;
          height: 6px;
          border-left: 2px solid $hover-color;
          border-bottom: 2px solid $hover-color;
          transform: rotate(-45deg);
        }
      }
    }
  }

  .m-modal-context{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .01);
    overflow: visible;

    .m-context{
      position: absolute;
      padding: 5px 0;
      width: 100px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 0 2px 0 #eee;

      &-item{
        padding: 0 10px;
        line-height: 32px;
        border-top: 1px solid #eee;
        cursor: pointer;
        &:first-child{
          border: none;
        }
        &:hover{
          background-color: #eee;
        }
      }

      .iconfont{
        margin-right: 8px;
      }
    }
  }
</style>
