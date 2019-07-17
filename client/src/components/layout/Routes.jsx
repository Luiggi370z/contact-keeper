import React, { Fragment, useContext, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { AuthContext } from 'context/auth'

import Home from 'pages/Home'
import About from 'pages/About'
import PrivateRoute from 'components/routing/PrivateRoute'
import Register from 'components/auth/Register'
import Login from 'components/auth/Login'
import Alerts from './Alerts'
import Navbar from './Navbar'

const Routes = withRouter(({ history }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, loadUser, loading, user, token } = authContext

  useEffect(() => {
    if (token || isAuthenticated) loadUser()
    // eslint-disable-next-line
  }, [token, isAuthenticated])

  useEffect(() => {
    if (user) history.push('/')
    // eslint-disable-next-line
  }, [user, history])

  if (loading)
    return (
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
    )

  return !isAuthenticated ? (
    <div
      className="ui middle aligned center aligned grid"
      style={{ backgroundColor: '#DADADA', height: '100%' }}
    >
      <div className="column" style={{ maxWidth: '450px' }}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </div>
  ) : (
    <Fragment>
      <Navbar />
      <div className="ui container">
        <Alerts />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Fragment>
  )
})

export default Routes
