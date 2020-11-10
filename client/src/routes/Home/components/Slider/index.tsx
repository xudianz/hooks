import React, { PropsWithChildren, useEffect } from 'react';
import { Slider } from '@/type';
import { Carousel } from 'antd';
import './index.less'

type Props = PropsWithChildren<{
  sliders: Slider[],
  getSliders: () => void
}>

function HomeSliders(props: Props) {

  useEffect(() => {
    if (props.sliders.length === 0) {
      props.getSliders()
    }
  }, [])

  return (
    <Carousel>
      {props.sliders.map((item: Slider) => (
        <div className="slider-item" key={item.id}>
          <img src={item.url} />
        </div>
      ))}
    </Carousel>
  )
}

export default HomeSliders