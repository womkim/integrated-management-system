/**
 * Created by womkim on 2017/10/19.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import { classname } from '@/utils/util'

import { Menu, Icon, Switch } from 'antd'
const { SubMenu, Item, ItemGroup } = Menu

let lvlMap = {}

const getMenus = (menuTree = [], siderFold) => menuTree.map(item => {
  if (item.children) {
    if (item.pid) {
      lvlMap[item._id] = item.pid
    }
    return <SubMenu
      key={item._id}
      title={<span>
        {item.icon && <Icon type={item.icon} />}
        <span>{item.label}</span>
      </span>}
    >
      {getMenus(item.children, siderFold)}
    </SubMenu>
  }
  return <Item key={item._id}>
    <Link to={item.uri}>
      {item.icon && <Icon type={item.icon} />}
      <span>{item.label}</span>
    </Link>
  </Item>
})

class Sider extends React.Component {
  render () {
    const { isNavbar, siderFold, darktheme, switchTheme, menuList, menuOpenId } = this.props
    return <div className={classname(['m-sider', siderFold ? 'fold' : null, darktheme ? null : 'light'])}>
      <div className="logo">logo react</div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[menuOpenId]}
        mode="inline"
        theme={darktheme ? 'dark' : 'light'}
        inlineCollapsed={siderFold}
      >
        <Item key="1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </Item>
        <Item key="2">
          <Icon type="desktop" />
          <span>Option 2</span>
        </Item>
        <Item key="3">
          <Icon type="inbox" />
          <span>Option 3</span>
        </Item>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <Item key="5">Option 5</Item>
          <Item key="6">Option 6</Item>
          <Item key="7">Option 7</Item>
          <Item key="8">Option 8</Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Item key="9">Option 9</Item>
          <Item key="10">Option 10</Item>
        </SubMenu>
      </Menu>

      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[menuOpenId]}
        mode="inline"
        theme={darktheme ? 'dark' : 'light'}
        inlineCollapsed={siderFold}
      >
        {getMenus(menuList, siderFold)}
      </Menu>
      {siderFold
        ? null
        : <div className="switch-theme">
          <span style={{whiteSpace: 'nowrap'}}>
            <Icon type="bulb" />
            <span>Switch Theme</span>
          </span>
          <Switch
            checked={darktheme}
            onChange={switchTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>}
    </div>
  }
}

export default Sider
