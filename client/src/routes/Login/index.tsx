import React, { PropsWithChildren } from 'react'
import { Button, Form, Input } from 'antd'
import NavHeader from '@/components/NavHeader'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import { connect } from 'react-redux'
import { CombinedState, ProfileState } from '@/type/state'
import { LoginValues } from '@/type/profile'
import mapDispatchToProps from '@/store/actions/profile'
import { Link, RouteComponentProps } from 'react-router-dom'
// import { FormProps } from 'antd/lib/form' // 从props获取form属性

type Props = PropsWithChildren<RouteComponentProps & ProfileState & typeof mapDispatchToProps>

function Login(props: Props) {
  const [form] = Form.useForm()

  const onFinish = (values: LoginValues) => {
    // xudian 000000
    props.loginAction(values)
  }

  const onFinishFailed = (errorInfo: object) => {
    console.log(errorInfo)
  }

  return (
    <>
      <NavHeader history={props.history}>登录</NavHeader>
      <Form
        name="login"
        form={form}
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder="请输入用户名" prefix={<UserOutlined/>} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password placeholder="请输入密码" prefix={<LockOutlined/>} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          <span>或者</span>
          <Link to="/register">注册</Link>
        </Form.Item>
      </Form>
    </>
  )
}


export default connect(
  (state: CombinedState): ProfileState => state.profile,
  mapDispatchToProps
)(Login)
