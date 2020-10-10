import React, { PropsWithChildren } from 'react'
import HomeHeader from './components/HomeHeader'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomeState, CombinedState } from '@/type/state'
import mapDispatchToProps from '@/store/actions/home'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

function Home(props: Props) {
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}/>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)