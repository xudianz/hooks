import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps>

function Tabs(props: Props) {
  return (
    <header className="nav-header">
      <LeftOutlined onClick={() => props.history.goBack()}/>
      { props.children }
    </header>
  )
}

export default Tabs