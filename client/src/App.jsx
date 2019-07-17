import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ContactState } from 'context/contact'
import { AuthState } from 'context/auth'
import { AlertState } from 'context/alert'
import './App.css'
import setAuthToken from 'utils/setAuthToken'
import Routes from 'components/layout/Routes'

if (localStorage.token) setAuthToken(localStorage.token)

const App = () => (
  <AuthState>
    <ContactState>
      <AlertState>
        <Router>
          <Routes />
        </Router>
      </AlertState>
    </ContactState>
  </AuthState>
)

export default App
