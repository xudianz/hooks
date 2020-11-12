import React, { PropsWithChildren, useEffect } from 'react'
import { Lesson, Lessons } from '@/type'
import { MenuOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import './index.less'

type Props = PropsWithChildren<{
  getLessons: () => void,
  lessons: Lessons
}>

function LessonList(props: Props) {

  useEffect(() => {
    props.getLessons()
  }, [])

  return (
    <section className="lesson-list">
      <h2><MenuOutlined />全部技术</h2>
      {
        props.lessons.list.map((item: Lesson) => (
          <Card
            hoverable
            style={{width: '100%'}}
            cover={<img src={item.poster} />}
            key={item.id}
          >
            <Card.Meta title={item.title} description={`价格: ¥${item.price}元`} />
          </Card>
        ))
      }
    </section>
  )
}

export default LessonList