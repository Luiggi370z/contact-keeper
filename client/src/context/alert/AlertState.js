import React, { useReducer } from 'react'
import uuid from 'uuid'
import alertReducer from './alertReducer'
import * as types from './types'
import AlertContext from './alertContext'

const initialState = []

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState)

  const setAlert = (msg, type, timeout = 4000) => {
    const id = uuid.v4()

    dispatch({ type: types.SET_ALERT, payload: { msg, type, id } })

    setTimeout(
      () => dispatch({ type: types.REMOVE_ALERT, payload: id }),
      timeout,
    )
  }

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertState
