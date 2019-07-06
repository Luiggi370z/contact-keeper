import * as types from './types'

export default (state, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case types.AUTH_ERROR:
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      }

    case types.CLEAR_ERRORS:
      return { ...state, error: null }

    case types.USER_LOADED:
      return {
        ...state,
        user: { ...payload },
        isAuthenticated: true,
        loading: false,
      }

    default:
      return state
  }
}
