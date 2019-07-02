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
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = () => {}
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactState
