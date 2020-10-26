import React, { PropsWithChildren } from 'react'
import { Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './index.less'
import { connect } from 'react-redux'
import { CombinedState, ProfileState } from '@/type/state'
import mapDispatchToProps from '@/store/actions/profile'
import { RouteComponentProps } from 'react-router-dom'
// import { FormProps } from 'antd/lib/form' // 从props获取form属性

type Props = PropsWithChildren<RouteComponentProps & ProfileState & typeof mapDispatchToProps>

function Register(props: Props) {
  const [form] = Form.useForm()
  return (
    <Form
      name="register"
      form={form}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <Input placeholder="请输入用户名" prefix={UserOutlined} />
      </Form.Item>
    </Form>
  )
}


export default connect(
  (state: CombinedState): ProfileState => state.profile,
  mapDispatchToProps
)(Register)
