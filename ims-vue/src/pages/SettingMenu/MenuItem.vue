<template lang="pug">
  .menu-item
    p {{ title }}
    .item-wrapper(:class="{'disabled': !hasPid}")
      .form-item-label 父级ID
      .form-item-input
        input(type="text", v-model="pid", :disabled="!hasPid")
    .item-wrapper
      .form-item-label 菜单名称
      .form-item-input
        input(type="text", v-model="menuname")
    .item-wrapper
      .form-item-label Icon选择
      .form-item-input
        .m-select(@click.stop.prevent="toggleSelect('iconSelectOpen')")
          i.iconfont(:class="selectedIcon")
          span {{ selectedIcon }}
          .right-arrow.iconfont.icon-arrow-down(:class="{'open': iconSelectOpen}")
          ul.s-options(v-show="iconSelectOpen")
            li.s-option-list(v-for="(item, index) in $store.state.app.icons", :key="index", @click.stop.prevent="selectItem('selectedIcon', item)")
              i.iconfont(:class="item")
              span {{ item }}
    .item-wrapper
      .form-item-label 链接地址
      .form-item-input
        input(type="text", v-model="link")
    .item-wrapper
      .form-item-label 排序
      .form-item-input
        input(type="number", min="0", max="999", v-model="order")
    .item-wrapper
      .form-item-label 是否显示
      .form-item-input
        .m-select(@click.stop.prevent="toggleSelect('isShowOpen')")
          span {{ selectedIsShow ? '是' : '否' }}
          .right-arrow.iconfont.icon-arrow-down(:class="{'open': isShowOpen}")
          ul.s-options(v-show="isShowOpen")
            li.s-option-list(v-for="(item, index) in [true, false]", :key="index", @click.stop.prevent="selectItem('selectedIsShow', item)") {{ item ? '是' : '否' }}
    .item-wrapper
      .form-item-label 开发可见
      .form-item-input
        .m-select(@click.stop.prevent="toggleSelect('isDevShowOpen')")
          span {{ selectedIsDevShow ? '是' : '否' }}
          .right-arrow.iconfont.icon-arrow-down(:class="{'open': isDevShowOpen}")
          ul.s-options(v-show="isDevShowOpen")
            li.s-option-list(v-for="(item, index) in [true, false]", :key="index", @click.stop.prevent="selectItem('selectedIsDevShow', item)") {{ item ? '是' : '否' }}
    .item-wrapper.item-submit
      button.btn(@click="onSubmit") 确 定
</template>
<script>
  function handleRoute (vm, id, action) {
    const data = vm.$store.state.app.menuList.filter(_ => _._id === id)[0]
    vm.type = action
    if (action === 'edit') {
      vm.title = '编辑菜单'
      vm.id = id
      if (data.pid !== '' && typeof data.pid !== 'undefined') {
        vm.pid = data.pid
      }
      vm.hasPid = true
      vm.menuname = data.label
      vm.selectedIcon = data.icon
      vm.link = data.uri
      vm.order = data.order
      vm.selectedIsShow = data.isShow
      vm.selectedIsDevShow = data.isDevShow
    } else {
      if (id !== '0') {
        vm.title = '添加子菜单'
        vm.pid = id
        vm.hasPid = true
      } else {
        vm.title = '添加菜单'
        vm.pid = ''
        vm.hasPid = false
      }
      vm.menuname = ''
      vm.selectedIcon = ''
      vm.link = '/'
      vm.order = '0'
      vm.selectedIsShow = true
      vm.selectedIsDevShow = true
    }
    console.log(vm)
  }

  export default {
    name: 'MenuItem',
    data () {
      return {
        type: 'add',
        title: '添加菜单',
        hasPid: false,
        iconSelectOpen: false,
        isShowOpen: false,
        isDevShowOpen: false,
        id: '',
        pid: '',
        menuname: '',
        selectedIcon: 'icon-setting',
        link: '/',
        order: '0',
        selectedIsShow: true,
        selectedIsDevShow: true
      }
    },
    beforeRouteEnter (to, from, next) {
      const { id, action } = to.params
      next(vm => {
        handleRoute(vm, id, action)
      })
    },
    beforeRouteUpdate (to, from, next) {
      const { id, action } = to.params
      next(vm => {
        handleRoute(vm, id, action)
      })
    },
    methods: {
      toggleSelect (type) {
        this.iconSelectOpen = false
        this.isShowOpen = false
        this.isDevShowOpen = false
        this[type] = true
      },
      selectItem (type, item) {
        this[type] = item
        this.iconSelectOpen = false
        this.isShowOpen = false
        this.isDevShowOpen = false
      },
      onSubmit () {
        console.log(this.type)
        if (this.type === 'edit') {
          if (this.id === this.pid) {
            window.alert(`an erroe occured: id as same as the pid`)
            return
          }
          this.$http('/api/updateMenuById', {
            method: 'post',
            params: {
              token: '123'
            },
            data: {
              id: this.id,
              pid: this.pid,
              label: this.menuname,
              icon: this.selectedIcon,
              uri: this.link,
              order: this.order,
              isShow: this.selectedIsShow,
              isDevShow: this.selectedIsDevShow
            }
          }).then(data => {
            data = data.data
            if (data.code === 0) {
              this.$store.dispatch('loadMenuList')
              this.$router.push('/setting-menu')
            } else {
              console.log(`-> an erroe occured: ${data.message}`)
              window.alert(`an erroe occured: ${data.message}`)
            }
          }).catch(e => {
            console.log(`-> an erroe occured: ${e.message}`)
          })
        } else {
          this.$http('/api/saveMenu', {
            method: 'post',
            params: {
              token: '123'
            },
            data: {
              id: this.id,
              pid: this.pid,
              label: this.menuname,
              icon: this.selectedIcon,
              uri: this.link,
              order: this.order,
              isShow: this.selectedIsShow,
              isDevShow: this.selectedIsDevShow
            }
          }).then(data => {
            data = data.data
            if (data.code === 0) {
              this.$store.dispatch('loadMenuList')
              this.$router.push('/setting-menu')
            } else {
              console.log(`-> an erroe occured: ${data.message}`)
              window.alert(`an erroe occured: ${data.message}`)
            }
          }).catch(e => {
            console.log(`-> an erroe occured: ${e.message}`)
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .menu-item{
    .item-wrapper{
      line-height: 50px;
      .form-item-label{
        display: inline-block;
        position: relative;
        padding-right: 16px;
        width: 30%;
        text-align: right;

        &:after{
          content: ':';
          position: absolute;
          right: 8px;
        }
      }
      .form-item-input{
        display: inline-block;
        width: 70%;
        input, textarea{
          padding: 4px 5px;
          min-width: 40%;
          line-height: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          outline: none;
          transition: all .2s;

          &:focus, &:hover{
            border: 1px solid #49a9ee;
            box-shadow: 0 0 0 2px rgba(16,142,233,.2);
          }
          &:disabled{
            border: none;
            box-shadow: none;
          }
        }
        .m-select{
          display: inline-block;
          position: relative;
          padding: 0 10px;
          width: 200px;
          height: 32px;
          line-height: 30px;
          vertical-align: middle;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          font-size: 14px;
          white-space: nowrap;
          text-overflow: ellipsis;
          outline: none;
          cursor: pointer;
          transition: all .2s;
          .right-arrow{
            position: absolute;
            top: 0;
            right: 0;
            transform: rotate(0deg);
            transition: all .3s;
            &.open{
              transform: rotate(-180deg);
            }
          }
        }
        .iconfont{
          margin-right: 8px;
        }
      }

      .btn{
        margin-top: 40px;
        padding: 0 15px;
        height: 32px;
        min-width: 200px;
        border: 1px solid #108ee9;
        border-radius: 4px;
        color: #fff;
        background-color: #108ee9;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: all .3s;
        &:focus, &:active, &:hover{
          background-color: #49a9ee;
          border-color: #49a9ee;
          outline: none;
        }
      }
    }
    .item-submit{
      margin-left: 30%;
    }
  }

  .s-options{
    position: absolute;
    top: 32px;
    left: 0;
    z-index: 100;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    transition: all .3s;
    .s-option-list{
      padding: 2px 10px;
      border-top: 1px solid #eee;
      &:first-child{
        border: none;
      }
      &:hover{
        background: #eee;
      }
    }
  }
</style>
