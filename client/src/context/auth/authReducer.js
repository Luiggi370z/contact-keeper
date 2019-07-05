import * as types from './types'

export default (state, { type, payload }) => {
  switch (type) {
    case types.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case types.REGISTER_FAIL:
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

    default:
      return state
  }
}
