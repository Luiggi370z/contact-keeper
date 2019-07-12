import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { Menu, Icon, Button } from 'semantic-ui-react'
import { AuthContext } from 'context/auth'
import { ContactContext } from 'context/contact'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { isAuthenticated, logout, user } = authContext
  const { clearContacts } = contactContext

  const onLogout = () => {
    logout()
    clearContacts()
  }

  const authLinks = (
    <Fragment>
      <Menu.Menu position="right">
        <Menu.Item>
          <h3 className="ui blue header">{user && user.name}</h3>
        </Menu.Item>
        <Menu.Item>
          <Button circular icon basic onClick={onLogout}>
            <Icon name="log out" color="blue" size="large" />
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Fragment>
  )

  return (
    <Menu stackable size="large" borderless>
      <Menu.Item>
        <Icon size="large" name={icon} fitted />
      </Menu.Item>
      <Menu.Item header>
        <h3>{title}</h3>
      </Menu.Item>

      <Menu.Item as={NavLink} to="/about" name="about">
        About
      </Menu.Item>

      <Menu.Menu position="right">{isAuthenticated && authLinks}</Menu.Menu>
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
