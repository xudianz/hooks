import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProfileState, CombinedState, LOGIN_TYPES } from '@/type/state'
import mapDispatchToProps from '@/store/actions/profile'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

function Profile(props: Props) {
  let content
  if (props.loginState = LOGIN_TYPES.UN_VALIDATE) {
    return null
  }
  return (
    <section>
      {content}
    </section>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)