<template lang="pug">
  .setting-menu
    //- 删除确认弹出窗
    Modal(v-model="modalQuerydelete", width="400")
      p(slot="header", style="color: #f60;")
        Icon(type="information-circled")
        span(style="margin-left: 8px;") 确认删除
      p 删除不可恢复！是否继续删除？
      p(slot="footer")
        IButton(type="primary", size="small", @click="modalQuerydelete = false") 取消
        IButton(type="error", size="small", :loading="modalDeleteLoading", @click="delItem") 删除

    //- 添加编辑弹出窗
    Modal(v-model="modalEditor", :mask-closable="false")
      div(slot="header")
        Icon(type="information-circled")
        span(style="margin-left: 8px;") {{ modalEditorTitle }}
      .m-modal-content
        .items
          span.title 父级名称
          IInput.m-input(v-model="parentName", disabled, placeholder="父级菜单名称")
        .items
          span.title 菜单名称
          IInput.m-input(v-model="menuName", placeholder="当前新建菜单名称")
        .items
          span.title 图标选择
          ISelect.m-input(v-model="iconSelected")
            IOption(v-for="(item, index) in $store.state.app.iviewIcons", :key="index", :value="item")
              Icon(:type="item", style="width: 16px; vertical-align: sub")
              span {{ item }}
        .items
          span.title 链接地址
          IInput.m-input(v-model="uri", placeholder="url地址")
        .items
          span.title 排序
          InputNumber.m-input(v-model="orderNum", :max="100", :min="1")
        .items
          span.title 是否显示
          .m-input
            ISwitch(v-model="isShow")
              span(slot="open") 是
              span(slot="close") 否
        .items
          span.title 开发可见
          .m-input
            ISwitch(v-model="isDevShow")
              span(slot="open") 是
              span(slot="close") 否
      div(slot="footer")
        IButton(type="default", style="width: 100px;", @click="modalEditor = false") 取消
        IButton(type="primary", style="width: 100px;", :loading="modalEditorLoading", @click="handleOk") 确定
    .menu-title
      span.txt(style="width: calc(10% + 48px); min-width: 110px;") 菜单名称
      span.txt(style="width: 20%; min-width: 40px;") 地址
      span.txt(style="width: 10%; min-width: 40px;") 是否可见
      span.txt(style="width: 10%;") 操作
    Tree.m-treemenu(:data="$store.state.app.menuList", :render="renderContent", :multiple="true", ref="treemenu")
</template>

<script>
  import { findIds } from '@/assets/js/utils'
  import Tree from 'iview/src/components/tree'
  import Icon from 'iview/src/components/icon'
  import IButton from 'iview/src/components/button'
  import IInput from 'iview/src/components/input'
  import ISelect from 'iview/src/components/select/select'
  import IOption from 'iview/src/components/select/option'
  import InputNumber from 'iview/src/components/input-number'
  import ISwitch from 'iview/src/components/switch'
  import Modal from 'iview/src/components/modal'
  import Message from 'iview/src/components/message'
  export default {
    name: 'setting-menu',
    components: {
      Tree,
      Icon,
      IButton,
      IInput,
      ISelect,
      IOption,
      InputNumber,
      ISwitch,
      Modal
    },
    data () {
      return {
        modalEditor: false,
        modalEditorLoading: false,
        modalEditorTitle: '',
        modalQuerydelete: false,
        modalDeleteLoading: false,
        parentName: 'root',
        id: '',
        pid: '',
        menuName: '',
        iconSelected: '',
        uri: '',
        orderNum: 0,
        isShow: true,
        isDevShow: true,
        editType: ''
      }
    },
    mounted () {
      this.$store.commit('computeContainerWidth')
    },
    methods: {
      renderContent (h, d) {
        let data = d.data
        let w = this.$store.state.app.mainContainerWidth
        let f = this.$store.state.app.siderFold ? w - 102 : w - 284
        return <span style={{display: 'inline-block', width: 'calc(100% - 28px)', height: '48px', lineHeight: '48px', overflow: 'hidden'}}>
          <span style={{float: 'left', paddingLeft: '10px', width: !data.pid ? 18 + 0.1 * f + 'px' : 0.1 * f + 'px', minWidth: '80px'}}>
            <Icon type="ios-folder-outline" style={{marginRight: '8px'}} />
            <span>{data.label}</span>
          </span>
          <span style={{float: 'left', paddingLeft: '10px', width: 0.2 * f + 'px', minWidth: '40px', borderLeft: '1px solid #ccc'}}>
            <span>{data.uri}</span>
          </span>
          {w > 400 && <span style={{float: 'left', paddingLeft: '10px', width: 0.1 * f + 'px', minWidth: '40px', borderLeft: '1px solid #ccc'}}>
            <span>{data.isShow ? '是' : '否'}</span>
          </span>}
          <span style={{float: 'left', paddingLeft: '10px', borderLeft: '1px solid #ccc'}}>
            <IButton type="success" icon="plus" size="small" class="btn" onClick={() => { this.addItem(data, 1) }}>{f < 700 ? '' : '添加同级'}</IButton>
            <IButton type="primary" icon="plus-round" size="small" class="btn" onClick={() => { this.addItem(data, 2) }}>{f < 700 ? '' : '添加下级'}</IButton>
            <IButton type="info" icon="edit" size="small" class="btn" onClick={() => { this.editItem(data) }}>{f < 700 ? '' : '编辑'}</IButton>
            <IButton type="error" icon="minus-round" size="small" class="btn" onClick={() => { this.removeItem(data) }}>{f < 700 ? '' : '删除'}</IButton>
          </span>
        </span>
      },
      initialState () {
        this.parentName = 'root'
        this.id = ''
        this.pid = ''
        this.menuName = ''
        this.iconSelected = ''
        this.uri = ''
        this.orderNum = 0
        this.isShow = true
        this.isDevShow = true
        this.editType = ''
      },
      addItem (data, type) {
        this.editType = 'add'
        if (type === 1) { // 添加同级
          if (data.pid) {
            this.pid = data.pid
            // this.parentName = data.label // 这里需要重新处理
          }
          this.modalEditor = true
          this.modalEditorTitle = '添加同级菜单'
        }
        if (type === 2) { // 添加下级
          if (data.pid) {
            Message.error('当前暂不支持继续添加下一级菜单')
            return
          }
          this.modalEditor = true
          this.modalEditorTitle = '添加下级菜单'
          this.pid = data._id
          this.parentName = data.label
        }
      },
      editItem (data) { // 编辑
        console.log(data)
        this.editType = 'edit'
      },
      removeItem (data) { // 删除
        let ids = findIds(data, '_id')
        console.log(ids)
        this.modalQuerydelete = true
      },
      delItem (ids) { // 点击确认后的删除操作
        this.modalDeleteLoading = true
        this.$http('/api/removeMenuById', {
          method: 'post',
          params: {
            token: '123'
          },
          data: {
            id: ids
          }
        }).then(data => {
          console.log(data.data)
          this.modalDeleteLoading = false
          this.modalQuerydelete = false
          if (data.data.code === 0) {
            Message.success('删除成功')
            this.$store.dispatch('loadMenuList')
          } else {
            Message.error('删除失败')
          }
        }).catch(e => {
          this.modalDeleteLoading = false
          this.modalQuerydelete = false
          Message.error('删除失败')
          console.log(`-> an error occured: ${e.message}`)
        })
      },
      handleOk (type) { // 添加/编辑点击确认后的操作
        if (this.menuName === '') {
          return Message.error('菜单名称不能为空')
        }
        if (this.iconSelected === '') {
          return Message.error('请选择图标')
        }
        if (this.uri.charAt(0) !== '/') {
          return Message.error('URL地址必须是以 / 开头')
        }
        console.log(this.pid)
        this.modalEditorLoading = true
        if (this.editType === 'add') {
          this.$http('/api/saveMenu', {
            method: 'post',
            params: {
              token: '123'
            },
            data: {
              pid: this.pid,
              label: this.menuName,
              icon: this.iconSelected,
              uri: this.uri,
              order: this.orderNum,
              isShow: this.isShow,
              isDevShow: this.isDevShow
            }
          }).then(data => {
            this.initialState()
            data = data.data
            if (data.code === 0) {
              this.$store.dispatch('loadMenuList')
              this.modalEditorLoading = false
              this.modalEditor = false
            } else {
              Message.error(`添加失败: ${data.message}`)
              this.modalEditorLoading = false
              this.modalEditor = false
            }
          }).catch(e => {
            this.initialState()
            console.log(`-> an erroe occured: ${e.message}`)
            this.modalEditorLoading = false
            this.modalEditor = false
            Message.error(e.message)
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }
  .m-modal-content{
    padding: 20px;
    .items{
      display: flex;
      margin: 12px 0;
      .title{
        padding-right: 15px;
        width: 90px;
        line-height: 32px;
        text-align: right;
      }
      .m-input{
        flex: 1;
        line-height: 32px;
        & > span{
          line-height: 18px;
        }
      }
    }
  }
  .setting-menu{
    padding: 10px;
    background-color: #fff;
    .menu-title{
      width: 100%;
      height: 48px;
      line-height: 48px;
      border: 1px solid #ccc;
      border-bottom: none;
      .txt{
        display: inline-block;
        padding-left: 10px;
        vertical-align: top;
        border-left: 1px solid #ccc;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &:first-child{
          border: none;
        }
      }
    }
    .m-treemenu{
      border: 1px solid #ccc;
      border-top: none;
      ul{
        border-top: 1px solid #ccc;
        li{
          margin: 0;
        }
      }
    }
    .btn{
      margin-right: 8px;
      padding: 2px 8px 4px;
      @media (max-width: 400px) {
        padding: 0 2px 5px 2px;
      }
      .ivu-icon{
        vertical-align: sub;
      }
    }
  }
  .ivu-tree-arrow{
    width: 26px;
  }
  .ivu-icon{
    vertical-align: middle;
  }
</style>
