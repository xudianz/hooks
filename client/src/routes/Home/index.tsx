import React, { PropsWithChildren, useRef } from 'react'
import HomeHeader from './components/HomeHeader'
import HomeSlider from './components/Slider'
import LessonList from './components/LessonList'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomeState, CombinedState } from '@/type'
import mapDispatchToProps from '@/store/actions/home'
import './index.less'

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>

function Home(props: Props) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      <HomeHeader
        currentCategory={props.currentCategory}
        setCurrentCategory={props.setCurrentCategory}
      />
      <div className="home-container" ref={ref}>
        <HomeSlider sliders={props.sliders} getSliders={props.getSliders}/>
        <LessonList getLessons={props.getLessons} lessons={props.lessons}/>
      </div>
    </>
  )
}

const mapStateToProps = (state: CombinedState): HomeState => state.home

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)