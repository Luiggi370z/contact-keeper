import React from 'react'
import PropTypes from 'prop-types'

const About = ({ history }) => {
  const goBack = () => {
    history.goBack()
  }

  return (
    <div>
      <h1>About this app</h1>
      <p>This is a full stack react app for keeping contacts</p>
      <p>Version: 1.0.0</p>
      <button className="ui button primary" type="button" onClick={goBack}>
        Go back
      </button>
    </div>
  )
}

About.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
}

export default About
