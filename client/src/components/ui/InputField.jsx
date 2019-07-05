import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ field, label, type, ...props }) => (
  <div className="field">
    <label htmlFor={field}>{label}</label>
    <input id={field} name={field} type={type} {...props} />
  </div>
)

InputField.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
