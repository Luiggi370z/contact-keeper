import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputField } from 'components/ui'
import { AuthContext } from 'context/auth'
import { AlertContext } from 'context/alert'

const Login = ({ history }) => {
  const authContext = useContext(AuthContext)
  const { login, error, clearErrors, isAuthenticated } = authContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'negative')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history])

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
    <div className="ui container">
      <h2 className="ui header">Account Login</h2>
      <form className="ui form" onSubmit={onSubmit}>
        <InputField
          field="email"
          label="Email"
          required
          value={email}
          onChange={onChange}
        />
        <InputField
          type="password"
          field="password"
          label="Password"
          value={password}
          onChange={onChange}
        />
        <input className="ui button primary" type="submit" value="Login" />
      </form>
      <div className="ui segment">
        <span>New to us? </span>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
