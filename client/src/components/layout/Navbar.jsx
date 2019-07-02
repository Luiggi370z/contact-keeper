import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

const Navbar = ({ title, icon }) => {
  return (
    <Menu stackable size="large" borderless>
      <Menu.Item>
        <Icon size="big" name={icon} fitted />
      </Menu.Item>
      <Menu.Item header>
        <h2>{title}</h2>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as={NavLink} to="/" name="home">
          Home
        </Menu.Item>
        <Menu.Item as={NavLink} to="/about" name="about">
          About
        </Menu.Item>
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
