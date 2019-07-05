import React, { useState, useContext } from 'react'
import { InputField } from 'components/ui'
import { AuthContext } from 'context/auth'

const Login = () => {
  const authContext = useContext(AuthContext)

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    authContext.login(user)
  }

  return (
    <div className="ui container">
      <h2 className="ui header">Account Login</h2>
      <form className="ui form" onSubmit={onSubmit}>
        <InputField
          field="email"
          label="Email"
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
    </div>
  )
}

export default Login
