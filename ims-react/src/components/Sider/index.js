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
        {getMenus(menuList, siderFold)}
      </Menu>
      {!siderFold && <div className="switch-theme">
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
