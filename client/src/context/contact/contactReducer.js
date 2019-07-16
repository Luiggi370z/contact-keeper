import * as types from './types'

export default (state, { type, payload }) => {
  switch (type) {
    case types.GET_CONTACTS:
      return { ...state, contacts: payload, loading: false }

    case types.ADD_CONTACT:
      return {
        ...state,
        contacts: state.contacts ? [payload, ...state.contacts] : [payload],
        loading: false,
      }

    case types.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === payload._id ? payload : contact,
        ),
        loading: false,
      }

    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== payload),
        loading: false,
      }

    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: false,
      }

    case types.CONTACT_ERROR:
      return {
        ...state,
        error: payload,
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

    case types.LOADING: {
      return { ...state, loading: true }
    }

    case types.TOGGLE_CONTACT_MODAL: {
      return { ...state, isModalOpen: payload }
    }

    default:
      return state
  }
}
