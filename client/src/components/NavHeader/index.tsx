import React, { PropsWithChildren } from 'react'
import { History } from 'history'
import { LeftOutlined } from '@ant-design/icons'
import './index.less'

type Props = PropsWithChildren<{
  history: History
}>

function Tabs(props: Props) {
  return (
    <header className="nav-header">
      <LeftOutlined onClick={() => props.history.goBack()}/>
      { props.children }
    </header>
  )
}

export default Tabs