<template lang="pug">
  .setting-menu
    Modal(v-model="modal", width="400")
      p(slot="header", style="color: #f60;")
        Icon(type="information-circled")
        span(style="margin-left: 8px;") 确认删除
      p 删除不可恢复！是否继续删除？
      p(slot="footer")
        IButton(type="primary", size="small", @click="modal = false") 取消
        IButton(type="error", size="small", :loading="modalLoading", @click="delItem") 删除
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
  import Modal from 'iview/src/components/modal'
  import Message from 'iview/src/components/message'
  export default {
    name: 'setting-menu',
    components: {
      Tree,
      Icon,
      IButton,
      Modal
    },
    data () {
      return {
        modal: false,
        modalLoading: false,
        treeData: [
          {
            label: 'parent1',
            expand: true,
            children: [
              { label: 'child1-1' },
              { label: 'child1-2' },
              { label: 'child1-3' }
            ]
          },
          {
            label: 'parent2',
            expand: true,
            children: [
              { label: 'child2-1' },
              { label: 'child2-2' },
              { label: 'child2-3' }
            ]
          }
        ]
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
            <IButton type="success" icon="plus" size="small" class="btn" onClick={() => { this.selectItem(d, data) }}>{f < 700 ? '' : '添加同级'}</IButton>
            <IButton type="primary" icon="plus-round" size="small" class="btn" onClick={() => { this.selectItem(d, data) }}>{f < 700 ? '' : '添加下级'}</IButton>
            <IButton type="info" icon="edit" size="small" class="btn" onClick={() => { this.selectItem(d, data) }}>{f < 700 ? '' : '编辑'}</IButton>
            <IButton type="error" icon="minus-round" size="small" class="btn" onClick={() => { this.removeItem(d, data) }}>{f < 700 ? '' : '删除'}</IButton>
          </span>
        </span>
      },
      add () {
        const checkedItems = this.$refs.treemenu.getCheckedNodes()
        const selecetdItems = this.$refs.treemenu.getSelectedNodes()
        console.log(checkedItems)
        console.log(selecetdItems)
      },
      selectItem (d, data) {
        console.log(data)
      },
      removeItem (d, data) {
        let ids = findIds(data, '_id')
        console.log(ids)
        this.modal = true
      },
      delItem (ids) {
        this.modalLoading = true
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
          this.modalLoading = false
          this.modal = false
          if (data.data.code === 0) {
            Message.success('删除成功')
            this.$store.dispatch('loadMenuList')
          } else {
            Message.error('删除失败')
          }
        }).catch(e => {
          this.modalLoading = false
          this.modal = false
          Message.error('删除失败')
          console.log(`-> an error occured: ${e.message}`)
        })
      }
    }
  }
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
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
