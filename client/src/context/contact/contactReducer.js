import * as types from './types'

export default (state, action) => {
  switch (action.type) {
    case types.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] }

    default:
      return state
  }
}
