import React from 'react'
import './index.less'
const Logo = require('@/assets/img/timg.jpg')

interface Props {

}

function HomeHeader(props: Props) {
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={Logo.default} alt="logo"/>
      </div>
    </header>
  )
}

export default HomeHeader