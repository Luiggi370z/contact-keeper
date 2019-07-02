import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ContactState } from 'context/contact'
import Navbar from 'components/layout/Navbar'
import Home from 'pages/Home'
import About from 'pages/About'

import './App.css'

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  )
}

export default App
