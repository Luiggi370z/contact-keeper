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
    <div className="ui middle aligned center aligned grid">
      <div className="column">
        <h2 className="ui teal image header">
          <i className="users large fitted icon" />
          <div className="content">Log-in to your account</div>
        </h2>
        <form className="ui large form" onSubmit={onSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  required
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            <input
              className="ui button fluid large teal submit"
              type="submit"
              value="Login"
            />
          </div>
        </form>

        <div className="ui message">
          <i className="icon help" />
          <span>New to us? </span>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
