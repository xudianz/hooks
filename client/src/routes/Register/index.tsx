import React, { PropsWithChildren } from 'react'
import { Button, Form, Input } from 'antd'
import NavHeader from '@/components/NavHeader'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import './index.less'
import { connect } from 'react-redux'
import { CombinedState, ProfileState } from '@/type/state'
import { RegisterValues } from '@/type/profile'
import mapDispatchToProps from '@/store/actions/profile'
import { Link, RouteComponentProps } from 'react-router-dom'
// import { FormProps } from 'antd/lib/form' // 从props获取form属性

type Props = PropsWithChildren<RouteComponentProps & ProfileState & typeof mapDispatchToProps>

function Register(props: Props) {
  const [form] = Form.useForm()

  const onFinish = (values: RegisterValues) => {
    props.register(values)
  }

  const onFinishFailed = (errorInfo: object) => {
    console.log(errorInfo)
  }

  return (
    <>
      <NavHeader history={props.history}>用户注册</NavHeader>
      <Form
        name="register"
        form={form}
        className="register-form"
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
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: '确认密码不能为空' }]}
        >
          <Input.Password placeholder="再次输入密码" prefix={<LockOutlined/>} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: 'email' }]}
        >
          <Input placeholder="请输入邮箱" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
          <span>或者</span>
          <Link to="/login">登录</Link>
        </Form.Item>
      </Form>
    </>
  )
}


export default connect(
  (state: CombinedState): ProfileState => state.profile,
  mapDispatchToProps
)(Register)
