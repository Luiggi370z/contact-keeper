import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { InputField } from 'components/ui'
import { AuthContext } from 'context/auth'
import { AlertContext } from 'context/alert'

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
    history.push('/login')
  }

  return (
    <div className="ui">
      <h1>Account Register</h1>
      <form className="ui form" onSubmit={onSubmit}>
        <InputField
          field="name"
          label="Name"
          value={name}
          onChange={onChange}
          required
        />
        <InputField
          field="email"
          label="Email"
          value={email}
          onChange={onChange}
          required
        />
        <InputField
          type="password"
          field="password"
          label="Password"
          value={password}
          onChange={onChange}
          required
        />
        <InputField
          type="password"
          field="passwordConfirm"
          label="Confirm Password"
          value={passwordConfirm}
          onChange={onChange}
        />
        <input
          className="ui button basic"
          type="button"
          value="Cancel"
          onClick={cancel}
        />
        <input className="ui button primary" type="submit" value="Register" />
      </form>
    </div>
  )
}

Register.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default Register
