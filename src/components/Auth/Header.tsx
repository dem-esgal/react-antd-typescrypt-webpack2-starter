import React from 'react'
import {
  Icon,
  Tooltip
} from 'antd'
import { UserInfo } from 'interfaces/dto/UserInfo.interface'

let styles = require('./Header.less')

interface HeaderProps {
  onLogout: Function,
  user: UserInfo,
  loading: boolean,
}

export default (props: HeaderProps) => {
  const { user, loading, onLogout } = props
  const name = `${user.lastName} ${user.firstName} ${user.patronymic}`

  return (
    <div className={styles.login}>
      <div className={styles.initials}>
        <span>{name}</span>
        <Tooltip placement="bottomRight" title="Logout">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault()
              return onLogout()
            }}
          >
            <Icon className={styles.logout} type={loading ? 'loading' : 'logout'} />
          </a>
        </Tooltip>
      </div>
      <div className={styles.position}>{user.position}</div>
    </div>
  )
}
