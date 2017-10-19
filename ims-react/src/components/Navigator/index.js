/**
 * Created by womkim on 2017/10/19.
 */

import React from 'react'
import './index.scss'

import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const { SubMenu, Item } = Menu

class Navgator extends React.Component {
  render () {
    const { isNavbar, siderFold, darktheme, username, toggleSider } = this.props
    return <div className="m-nav">
      {
        isNavbar
          ? <div><Icon type="bars" /></div>
          : <div><Icon type={siderFold ? 'menu-fold' : 'menu-unfold'} /></div>
      }
      <Menu
        onClick={() => {}}
        mode="horizontal"
      >
        <SubMenu title={<span><Icon type="setting" />{username}</span>}>
          <Item key="logout">Sign out</Item>
        </SubMenu>
      </Menu>
    </div>
  }
}

export default Navgator
