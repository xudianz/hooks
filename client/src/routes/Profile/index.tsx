import React, { PropsWithChildren, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProfileState, CombinedState, LOGIN_TYPES } from '@/type/state'
import mapDispatchToProps from '@/store/actions/profile'
import NavHeader from '@/components/NavHeader'
import { Descriptions, Button, Alert } from 'antd'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

function Profile(props: Props) {

  useEffect(() => {
    props.validate()
  }, [])

  let content
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null
  } else if (props.loginState === LOGIN_TYPES.LOGINED) {
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">xudianz</Descriptions.Item>
          <Descriptions.Item label="邮箱">xudianz@qq.com</Descriptions.Item>
        </Descriptions>
        <Button danger onClick={props.logout()}>退出</Button>
      </div>
    )
  } else {
    content = (
      <div className="user-info">
        <Alert type="warning" message="您当前未登录" description="请注册账号或直接登录" showIcon />
        <div style={{textAlign: 'center', padding: '8px'}}>
          <Button type="dashed" onClick={() => props.history.push('/login')}>登录</Button>
          <Button type="dashed" onClick={() => props.history.push('/register')}>注册</Button>
        </div>
      </div>
    )
  }
  return (
    <section>
      <NavHeader history={props.history}>个人中心</NavHeader>
      {content}
    </section>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)