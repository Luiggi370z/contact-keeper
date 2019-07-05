import React, { useState, useContext, useEffect } from 'react'
import { InputField } from 'components/ui'
import { AuthContext } from 'context/auth'
import { AlertContext } from 'context/alert'

const Register = () => {
  const authContext = useContext(AuthContext)
  const { register, error, clearErrors } = authContext

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  useEffect(() => {
    if (error) {
      setAlert(error, 'negative')
      clearErrors()
    }
  }, [error])

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
        <input className="ui button primary" type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register
