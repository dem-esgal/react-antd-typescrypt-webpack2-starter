// Style should be imported first
import 'assets/styles/app.less'

import React from 'react'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import * as enUS from 'antd/lib/locale-provider/en_US'

import AppRouter from './router'
import configureStore from './store/configureStore'

const store = configureStore()

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <AppRouter />
        </LocaleProvider>
      </Provider>
    )
  }
}
