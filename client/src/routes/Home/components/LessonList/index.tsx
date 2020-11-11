import React, { PropsWithChildren, useEffect } from 'react'
import './index.less'

type Props = PropsWithChildren<{
  getLessons: () => void
}>

function LessonList(props: Props) {

  useEffect(() => {
    props.getLessons()
  }, [])

  return (
    <>
      <div>LessonList</div>
    </>
  )
}

export default LessonList