import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'
import {
  Layout as Wrapper,
  Col,
  Row
} from 'antd'

import AuthHeader from 'components/Auth/Header'
import {
  logout,
  restore
} from 'reducers/auth'
import Login from 'containers/Login'

const styles = require('./Layout.less')
@(withRouter as any)
@(connect(state => ({
  auth: state.auth,
})) as any)
export default class Layout extends React.Component<any, any> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(restore())
    // history.listen(location => dispatch(syncLocation(location.pathname)))
  }

  render() {
    const { auth, pages, dispatch } = this.props
    const { user, loggedIn, loading } = auth

    return (
      <div className={styles.container}>
        <Helmet title="Brand name" />
        <Wrapper className={styles.layout}>
          <Wrapper.Header className={styles.header}>
            {loggedIn ? (
              <Row>
                <Col span={6}>
                  <img className={styles.logo} alt="Logo" />
                </Col>
                <Col span={5} offset={13}>
                  <AuthHeader
                    user={user}
                    loading={loading}
                    onLogout={() => dispatch(logout())}
                  />
                </Col>
              </Row>) : null
            }
          </Wrapper.Header>
          <Wrapper.Content>
            {loggedIn ? pages : (<Login {...this.props} />)}
          </Wrapper.Content>
          <Wrapper.Footer className={styles.footer}></Wrapper.Footer>
        </Wrapper>
      </div>
    )
  }
}
