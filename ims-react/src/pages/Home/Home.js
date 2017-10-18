/**
 * Created by womkim on 2017/10/18.
 */

import React from 'react'
import { connect } from 'react-redux'
import { toggleSider, changeNavbar, switchTheme, fetchDataIfNeeded } from '@/store/app/actions'

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
      <Button type="primary" onClick={() => { dispatch(toggleSider()) }}>siderFold</Button>
      <span>{`sider fold: ${siderFold ? 'yes' : 'no'}`}</span>
      <hr />
      <span>{`navbar state: ${isNavbar ? 'yes' : 'no'}`}</span>
      <hr />
      <Button type="primary" onClick={() => { dispatch(switchTheme()) }}>switch theme</Button>
      <span>{`theme state: ${darktheme ? 'dark' : 'light'}`}</span>
      <hr />
      <Button type="primary" onClick={() => { dispatch(fetchDataIfNeeded()) }}>getmenus</Button>
      {`menuList: isFetching: ${menuList.isFetching}, didInvalidate: ${menuList.didInvalidate}`}
      { menuList && Object.prototype.toString.call(menuList.items) === '[object Array]' && menuList.items.map(item => <div>{item.label}</div>) }
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
