import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { distanceInWordsToNow } from 'date-fns'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { Image } from 'semantic-ui-react'

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)
  const [isHover, setIsHover] = useState(false)

  const { _id: id, name, email, phone, type, avatarUrl, date } = contact
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
    toggleContactModal,
  } = contactContext
  const { setAlert } = alertContext

  const onDeleteContact = () => {
    deleteContact(id)
    setAlert('Contact was removed successfully', 'positive')
    clearCurrentContact()
  }
  const onEditContact = () => {
    setCurrentContact(contact)
    toggleContactModal(true)
  }

  const onOver = () => {
    setIsHover(true)
  }

  const onOut = () => {
    setIsHover(false)
  }

  return (
    <div
      className={`ui card fluid ${isHover && 'raised'}`}
      onMouseOver={onOver}
      onFocus={onOver}
      onMouseOut={onOut}
      onBlur={onOut}
    >
      <div className="ui blurring">
        <div
          className={`ui inverted dimmer ${isHover && 'active'}`}
          style={{ borderRadius: '4px' }}
        >
          <div className="content">
            <div className="center">
              <button
                className="ui circular icon button"
                type="button"
                onClick={onDeleteContact}
              >
                <i className="trash icon red large" />
              </button>
              <button
                className="ui circular icon button"
                type="button"
                onClick={onEditContact}
              >
                <i className="edit icon large" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Image src={avatarUrl} avatar size="massive" floated="left" />
        <div className="header" style={{ marginTop: '2px' }}>
          {name}
        </div>
        <div className="meta">
          {`added ${distanceInWordsToNow(date, { addSuffix: true })}`}
        </div>
        <div className="description">
          <div className="ui relaxed list">
            <div className="item">
              <i className="large mail middle aligned icon" />
              <div className="content">
                <div className="header">{email}</div>
              </div>
            </div>
            <div className="item">
              <i className="large phone middle aligned icon" />
              <div className="content">
                <div className="header">{phone}</div>
              </div>
            </div>
          </div>

          <div
            className={`ui label mini basic ${
              type === 'personal' ? 'teal' : 'yellow'
            }`}
            style={{ textTransform: 'uppercase', margin: '5px 0' }}
          >
            {type}
          </div>
        </div>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.instanceOf(Object).isRequired,
}

export default ContactItem
