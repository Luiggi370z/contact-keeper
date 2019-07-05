import React, { useReducer } from 'react'
import axios from 'axios'
import authReducer from './authReducer'
import AuthContext from './authContext'
import * as types from './types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
}

const headersConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loadUser = params => {}

  const register = async formData => {
    try {
      const res = await axios.post('/api/users', formData, headersConfig)
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data })
    } catch (err) {
      dispatch({ type: types.REGISTER_FAIL, payload: err.response.data.msg })
    }
  }

  const login = params => {}

  const logout = params => {}

  const clearErrors = params => {}

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
