import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { Menu, Icon, Button, Divider } from 'semantic-ui-react'
import { AuthContext } from 'context/auth'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout, user } = authContext

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      <Menu.Item exact as={NavLink} to="/" name="home">
        Contacts
      </Menu.Item>
      <Menu.Item>
        <span className="ui teal header">{user && user.name}</span>
      </Menu.Item>
      <Menu.Item>
        <Button circular icon color="blue" onClick={onLogout}>
          <Icon name="log out" />
        </Button>
      </Menu.Item>
    </Fragment>
  )

  return (
    <Menu stackable size="large" borderless>
      <Menu.Item>
        <Icon size="big" name={icon} fitted />
      </Menu.Item>
      <Menu.Item header>
        <h2>{title}</h2>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/about" name="about">
          About
        </Menu.Item>
        {isAuthenticated && authLinks}
      </Menu.Menu>
    </Menu>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'users',
}

export default Navbar
