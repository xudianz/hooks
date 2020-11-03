import { Slider } from '@/type';
import { Carousel } from 'antd';
import React, { CSSProperties, PropsWithChildren, useEffect } from 'react';

type Props = PropsWithChildren<{
  sliders: Slider[],
  getSliders: () => void
}>

function HomeSliders(props: Props) {

  useEffect(() => {
    props.getSliders()
  }, [])

  const contentStyle: CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  return (
    <Carousel>
      {props.sliders.map((item: Slider) => (
        <div key={item.id} style={contentStyle}>
          <img src={item.url} />
        </div>
      ))}
    </Carousel>
  )
}

export default HomeSliders