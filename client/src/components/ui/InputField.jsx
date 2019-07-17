import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ name, icon, type, ...props }) => (
  <div className="field">
    <div className="ui left icon input">
      <i className={`${icon} icon`} />
      <input name={name} type={type} {...props} />
    </div>
  </div>
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
