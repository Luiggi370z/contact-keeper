import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ContactState } from 'context/contact'
import { AuthState } from 'context/auth'
import { AlertState } from 'context/alert'
import Navbar from 'components/layout/Navbar'
import Home from 'pages/Home'
import About from 'pages/About'

import './App.css'
import Register from 'components/auth/Register'
import Login from 'components/auth/Login'
import Alerts from 'components/layout/Alerts'

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="ui container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
