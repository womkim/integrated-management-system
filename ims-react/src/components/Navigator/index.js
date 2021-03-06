/**
 * Created by womkim on 2017/10/19.
 */

import React from 'react'
import './index.scss'
import { classname } from '@/utils/util'

import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
const { SubMenu, Item } = Menu

class Navigator extends React.Component {
  render () {
    const { isNavbar, siderFold, darktheme, username, toggleSider } = this.props
    return <div className={classname(['m-nav', !isNavbar && siderFold ? 'fold-sider' : null, isNavbar ? 'navbar' : null])}>

      {isNavbar
        ? <div className="m-nav-btn"><Icon type="bars" /></div>
        : <div className="m-nav-btn" onClick={toggleSider}><Icon type={siderFold ? 'menu-fold' : 'menu-unfold'} /></div>}
      <div className="right-wrapper">
        <div className="m-nav-btn">
          <Icon type="home" />
        </div>
        <div>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </div>
        <Menu onClick={() => {}} mode="horizontal" >
          <SubMenu title={<span><Icon type="user" />{username}</span>}>
            <Item key="logout">Sign out</Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  }
}

export default Navigator
