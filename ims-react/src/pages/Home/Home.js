/**
 * Created by womkim on 2017/10/18.
 */

import React from 'react'
import { connect } from 'react-redux'
import { toggleSider, changeNavbar, switchTheme } from '@/store/app/actions'

import { DatePicker, Button } from 'antd'

class Home extends React.Component {
  constructor (props) {
    super(props)
    window.onresize = () => {
      props.dispatch(changeNavbar())
    }
  }
  render () {
    const { dispatch, siderFold, isNavbar, darktheme, menuList } = this.props
    return <div>
      <h3>home</h3>
      <Button onClick={() => { dispatch(toggleSider()) }}>siderFold</Button>
      <span>{`sider fold: ${siderFold ? 'yes' : 'no'}`}</span>
      <hr />
      <span>{`navbar state: ${isNavbar ? 'yes' : 'no'}`}</span>
      <hr />
      <Button onClick={() => { dispatch(switchTheme()) }}>switch theme</Button>
      <span>{`theme state: ${darktheme ? 'dark' : 'light'}`}</span>
      <hr />
      {`menuList: ${menuList}`}
      <hr />
      <DatePicker onChange={(date, dateString) => { console.log(date); console.log(dateString) }} />
    </div>
  }
}

const mapStateToProps = ({ app }) => {
  const { siderFold, isNavbar, darktheme, menuList } = app
  return { siderFold, isNavbar, darktheme, menuList }
}

export default connect(mapStateToProps)(Home)
