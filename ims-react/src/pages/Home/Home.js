/**
 * Created by womkim on 2017/10/18.
 */

import React from 'react'
import { connect } from 'react-redux'
import { toggleSider, changeNavbar, switchTheme, loadMenuList, changeMenuOpenId, loadUserinfo } from '@/store/app/actions'

import { DatePicker, Button } from 'antd'

import Navigator from '@/components/Navigator'
import Sider from '@/components/Sider'

import './home.scss'

class Home extends React.Component {
  constructor (props) {
    super(props)
    window.onresize = () => {
      props.dispatch(changeNavbar())
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadMenuList())
    dispatch(loadUserinfo())
  }

  render () {
    const { dispatch, siderFold, isNavbar, darktheme, menuList, menuOpenId, userinfo } = this.props
    const { username } = userinfo
    // props of sider component
    const siderProps = {
      menuList,
      siderFold,
      darktheme,
      switchTheme () {
        dispatch(switchTheme())
      },
      setOpenKeys (id) {
        dispatch(changeMenuOpenId(id))
      },
      menuOpenId
    }
    // props of navigator component
    const navgatorProps = {
      isNavbar,
      siderFold,
      darktheme,
      username,
      toggleSider () {
        dispatch(toggleSider())
      }
    }
    return <div>
      { isNavbar ? null : <Sider {...siderProps} /> }
      <div className="main">
        <Navigator {...navgatorProps} />
        <div className="container">
          asd...
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ app }) => {
  console.log(app)
  return app
}

export default connect(mapStateToProps)(Home)
