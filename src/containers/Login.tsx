import React from 'react'
import { connect } from 'react-redux'

import {
  Layout,
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon
} from 'antd'

import { login } from 'reducers/auth'

const styles = require('./Layout.less')

export interface LoginProps {
  dispatch: Function,
  auth?: any,
  form?: any,
}

@Form.create<any>()
@(connect(state => ({
  auth: state.auth,
})) as any)
export default class Login extends React.Component<LoginProps, any> {
  render() {
    const { dispatch, auth } = this.props
    const { getFieldDecorator } = this.props.form;

    const { loading } = auth

    return (
      <Layout className={styles.layout}>
        <Row>
          <Col span={6} offset={9}>
            <h3 className={styles.heading}>
              Authorize, please
            </h3>
            <Form
              className="form"
              onSubmit={(e) => {
                e.preventDefault()
                this.props.form.validateFields((err, values) => {
                  if (!err) {
                    dispatch(login(values))
                  }
                })
              }}
            >
              <Form.Item>
                {getFieldDecorator('login', {
                  rules: [{ required: true, message: 'Type user name' }],
                })(
                  <Input
                    disabled={loading}
                    placeholder="User name"
                    prefix={
                      <Icon type="user" style={{ fontSize: 13 }} />
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Type password' }],
                })(
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="Password"
                    prefix={
                      <Icon type="lock" style={{ fontSize: 13 }} />
                    }
                  />
                )}
              </Form.Item>
              <Form.Item className={styles.buttonItem}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className={styles.submit}
                >
                  Authorization
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    )
  }
}
