import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'context/auth'
import { AlertContext } from 'context/alert'
import Alerts from 'components/layout/Alerts'
import InputField from 'components/ui/InputField'

const Login = () => {
  const authContext = useContext(AuthContext)
  const { login, error, clearErrors } = authContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'negative')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    if (!email || !password) setAlert('Please enter all fields', 'negative')
    else login({ email, password })
  }

  return (
    <Fragment>
      <button
        type="button"
        className="ui icon button primary rounded large"
        style={{ pointerEvents: 'none', marginRight: '10px' }}
      >
        <i className="users large white icon" />
      </button>
      <h2 className="ui blue header" style={{ display: 'inline' }}>
        <div className="content" style={{ margin: '8px 0px' }}>
          Log-in to your account
        </div>
      </h2>
      <form
        className="ui large form"
        onSubmit={onSubmit}
        style={{ marginTop: '5px' }}
      >
        <div className="ui stacked segment">
          <InputField
            icon="envelope"
            name="email"
            placeholder="E-mail address"
            type="email"
            required
            value={email}
            onChange={onChange}
          />
          <InputField
            icon="lock"
            name="password"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={onChange}
          />
          <input
            className="ui button fluid large primary submit"
            type="submit"
            value="Login"
          />
        </div>
        <Alerts />
      </form>
      <div className="ui message">
        <span>New to us? </span>
        <Link to="/register">Sign Up</Link>
      </div>
    </Fragment>
  )
}

export default Login
