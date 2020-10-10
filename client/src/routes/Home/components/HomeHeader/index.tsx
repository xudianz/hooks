import React, { useState } from 'react'
import { BarsOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { Transition } from 'react-transition-group'
import './index.less'

const Logo = require('@/assets/img/timg.jpg')
const duration = 300

const defaultStyle: React.CSSProperties = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
  unmounted: { opacity: 0 }
}

interface Props {
  currentCategory: string;
  setCurrentCategory: (currentCategory: string) => void
}

function HomeHeader(props: Props) {

  let [visible, setVisible] = useState(false)

  const setCurrentCategory = (e: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = e.target as HTMLUListElement
    let category = target.dataset.category
    props.setCurrentCategory(category)
    // 关闭导航
    setVisible(false)
  }

  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={Logo.default} width="160" height="40" alt="logo"/>
        <BarsOutlined onClick={() => setVisible(!visible)}/>
      </div>
      <Transition in={visible} timeout={duration}>
        {
          state => (
            <ul
              className="category"
              onClick={setCurrentCategory}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <li data-category="all" className={classnames({active: props.currentCategory === 'all'})}>全部技术栈</li>
              <li data-category="react" className={classnames({active: props.currentCategory === 'react'})}>React技术栈</li>
              <li data-category="vue" className={classnames({active: props.currentCategory === 'vue'})}>Vue技术栈</li>
            </ul>
          )
        }
      </Transition>
    </header>
  )
}

export default HomeHeader