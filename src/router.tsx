import React from 'react'
import { Router, Route } from 'react-router-dom'
import { history } from 'utils/History'
import Layout from 'containers/Layout'

export default () => {
  const pages: any = (
    <div>
      {/*<Route path={ path } exact component={component} />*/}
      
    </div>
  )

  return (
    <Router history={history}>
      <Layout pages={pages} />
    </Router>
  )
}
