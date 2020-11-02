import React, { PropsWithChildren, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProfileState, CombinedState, LOGIN_TYPES } from '@/type/state'
import mapDispatchToProps from '@/store/actions/profile'
import NavHeader from '@/components/NavHeader'
import { Descriptions, Button, Alert, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

function Profile(props: Props) {

  let [loading, setLoading] = useState(false)

  useEffect(() => {
    props.validate()
  }, [])

  let content
  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null
  } else if (props.loginState === LOGIN_TYPES.LOGINED) {

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        setLoading(true)
        return
      }
      if (info.file.status === 'done') {
        const { success, data } = info.file.response
        if (success) {
          setLoading(false)
          props.setAvatar(data)
        } else {
          message.error('上传失败！')
        }
      }
    }

    const uploadButton = (
      <div>
        { loading ? <LoadingOutlined /> : <PlusOutlined /> }
        <div style={{ marginTop: 8 }}>上传头像</div>
      </div>
    )
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://localhost:8001/user/uploadAvatar"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              data={{userId: props.user.id}}
            >
              {props.user.avatar ? <img src={props.user.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button danger onClick={props.logout}>退出</Button>
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

function beforeUpload(file: RcFile) {
  console.log(file)
  const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
  if (!isJpgOrPng) {
    message.error('只能上传jpg、png格式的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
  }
  return isJpgOrPng && isLt2M
}