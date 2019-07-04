import * as types from './types'

export default (state, { type, payload }) => {
  switch (type) {
    case types.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] }

    case types.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === payload.id ? payload : contact,
        ),
      }

    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== payload),
      }

    case types.SET_CURRENT:
      return {
        ...state,
        current: payload,
      }

    case types.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      }

    case types.FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${payload}`, 'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        }),
      }

    default:
      return state
  }
}
