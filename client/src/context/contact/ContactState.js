import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import * as types from './types'

const ContactState = ({ children }) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Sara Smith',
        email: 'sara.smith@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Jill Johnson',
        email: 'jill.johnson@gmail.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry.white@gmail.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4()
    dispatch({ type: types.ADD_CONTACT, payload: contact })
  }

  const updateContact = contact =>
    dispatch({ type: types.UPDATE_CONTACT, payload: contact })

  const deleteContact = id =>
    dispatch({ type: types.DELETE_CONTACT, payload: id })

  const setCurrentContact = contact =>
    dispatch({ type: types.SET_CURRENT, payload: contact })

  const clearCurrentContact = () => dispatch({ type: types.CLEAR_CURRENT })

  const clearFilter = () => dispatch({ type: types.CLEAR_FILTER })

  const filterContacts = text => {
    dispatch({ type: types.FILTER_CONTACTS, payload: text })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        clearFilter,
        filterContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactState
