import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ field, label, ...props }) => (
  <div className="field">
    <label htmlFor={field}>{label}</label>
    <input id={field} name={field} type="text" {...props} />
  </div>
)

InputField.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default InputField
