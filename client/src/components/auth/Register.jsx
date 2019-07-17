import React, { Fragment, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { InputField } from 'components/ui'
import { AuthContext } from 'context/auth'
import { AlertContext } from 'context/alert'
import Alerts from 'components/layout/Alerts'

const fields = [
  {
    field: 'name',
    label: 'First and Last name',
    icon: 'user',
  },
  {
    field: 'email',
    label: 'E-mail address',
    icon: 'envelope',
    type: 'email',
  },
  {
    field: 'password',
    label: 'Password',
    icon: 'lock',
    type: 'password',
  },
  {
    field: 'passwordConfirm',
    label: 'Confirm Password',
    icon: 'lock open',
    type: 'password',
  },
]
const Register = ({ history }) => {
  const authContext = useContext(AuthContext)
  const { register, error, clearErrors, isAuthenticated } = authContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }

    if (error) {
      setAlert(error, 'negative')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const { name, email, password, passwordConfirm } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    if (!name || !email || !password) {
      setAlert('Please enter all fields', 'negative')
    } else if (password !== passwordConfirm)
      setAlert('Passwords do not match', 'negative')
    else register({ name, email, password })
  }

  const cancel = () => {
    history.push('/')
  }

  return (
    <Fragment>
      <h2 className="ui blue header">
        <div className="content">Create your account</div>
      </h2>
      <form className="ui large form" onSubmit={onSubmit}>
        <div className="ui stacked segment">
          {fields.map(item => (
            <InputField
              key={item.field}
              icon={item.icon}
              name={item.field}
              placeholder={item.label}
              type={item.type}
              required
              value={user[item.field]}
              onChange={onChange}
            />
          ))}
          <Alerts />

          <input
            className="ui button secondary "
            type="button"
            value="Cancel"
            onClick={cancel}
          />
          <input className="ui button primary" type="submit" value="Register" />
        </div>
      </form>
    </Fragment>
  )
}

Register.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default Register
