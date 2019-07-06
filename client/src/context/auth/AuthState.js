import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from 'utils/setAuthToken'
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

  const loadUser = async () => {
    if (localStorage.token) setAuthToken(localStorage.token)

    try {
      const res = await axios.get('/api/auth')
      dispatch({ type: types.USER_LOADED, payload: res.data })
    } catch (e) {
      dispatch({ type: types.AUTH_ERROR })
    }
  }

  const register = async formData => {
    try {
      const res = await axios.post('/api/users', formData, headersConfig)
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data })

      loadUser()
    } catch (err) {
      dispatch({ type: types.REGISTER_FAIL, payload: err.response.data.msg })
    }
  }

  const login = async formData => {
    try {
      const res = await axios.post('/api/auth', formData, headersConfig)
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })

      loadUser()
    } catch (err) {
      dispatch({ type: types.LOGIN_FAIL, payload: err.response.data.msg })
    }
  }

  const logout = () => dispatch({ type: types.LOGOUT })

  const clearErrors = () => dispatch({ type: types.CLEAR_ERRORS })

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
