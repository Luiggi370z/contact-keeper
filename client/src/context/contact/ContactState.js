import React, { useReducer } from 'react'
import axios from 'axios'
import { getHeader } from 'utils'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import * as types from './types'

const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    isModalOpen: false,
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  const getContacts = async () => {
    dispatch({ type: types.LOADING })
    try {
      const res = await axios.get('/api/contacts', getHeader)
      dispatch({ type: types.GET_CONTACTS, payload: res.data })
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  // Add Contact
  const addContact = async contact => {
    try {
      const res = await axios.post('/api/contacts', contact, getHeader)
      dispatch({ type: types.ADD_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  const updateContact = async contact => {
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        getHeader,
      )
      dispatch({ type: types.UPDATE_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({ type: types.CONTACT_ERROR, payload: err.response.data.msg })
    }
  }

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`, getHeader)
      dispatch({ type: types.DELETE_CONTACT, payload: id })
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  const setCurrentContact = contact =>
    dispatch({ type: types.SET_CURRENT, payload: contact })

  const clearCurrentContact = () => dispatch({ type: types.CLEAR_CURRENT })

  const clearFilter = () => dispatch({ type: types.CLEAR_FILTER })

  const clearContacts = () => dispatch({ type: types.CLEAR_CONTACTS })

  const filterContacts = text => {
    dispatch({ type: types.FILTER_CONTACTS, payload: text })
  }

  const toggleContactModal = open =>
    dispatch({ type: types.TOGGLE_CONTACT_MODAL, payload: open })

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.current,
        filtered: state.filtered,
        error: state.error,
        isModalOpen: state.isModalOpen,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        clearFilter,
        clearContacts,
        filterContacts,
        toggleContactModal,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactState
