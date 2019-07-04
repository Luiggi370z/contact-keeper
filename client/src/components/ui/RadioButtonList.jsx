import React from 'react'
import PropTypes from 'prop-types'

const RadioButtonList = ({ selectedValue, field, options, onChange }) => (
  <div className="inline fields">
    {options.map(option => (
      <div className="field" key={option.value}>
        <div className="ui radio checkbox">
          <input
            id={option.value}
            type="radio"
            name={field}
            value={option.value}
            checked={selectedValue === option.value}
            tabIndex="0"
            className="hidden"
            onChange={onChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      </div>
    ))}
  </div>
)

RadioButtonList.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}
export default RadioButtonList
