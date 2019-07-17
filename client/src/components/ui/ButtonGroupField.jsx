import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ButtonGroupField = ({
  field,
  disabled,
  selectedValue,
  icon,
  options,
  onChange,
}) => (
  <div className={`field ${disabled ? 'disabled' : ''}`}>
    <div className="ui left icon input" style={{ paddingLeft: '38px' }}>
      <i className={`${icon} icon`} />
      <div className="ui buttons fluid">
        {options.map((option, index) => (
          <Fragment key={option.value}>
            <button
              className={`ui icon button ${
                selectedValue === option.value ? 'active primary' : ''
              }`}
              type="button"
              value={option.value}
              name={field}
              onClick={onChange}
            >
              {option.label}
            </button>
            {index < options.length - 1 && <div className="or" />}
          </Fragment>
        ))}
      </div>
    </div>
  </div>
)

ButtonGroupField.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

ButtonGroupField.defaultProps = {
  disabled: false,
}

export default ButtonGroupField
