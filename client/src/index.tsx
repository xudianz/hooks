import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import '@/assets/style/common.less'
import Home from './routes/Home'
import Mine from './routes/Mine'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Test from './routes/Test'
import { ConnectedRouter } from 'connected-react-router'
import history from '@/history'
import Tabs from '@/components/Tabs'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/mine" component={Mine} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register} />
            <Route path="/test" component={Test} />
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))