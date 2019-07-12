import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { distanceInWordsToNow } from 'date-fns'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { Icon, List, Button, Image } from 'semantic-ui-react'

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
      <div className="blurring">
        <div
          className={`ui inverted dimmer ${isHover && 'active'}`}
          style={{ borderRadius: '4px' }}
        >
          <div className="content">
            <div className="center">
              <Button icon circular onClick={onDeleteContact}>
                <Icon name="trash" color="red" size="large" />
              </Button>
              <Button icon circular onClick={onEditContact}>
                <Icon name="edit" color="blue" size="large" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Image src={avatarUrl} avatar size="massive" floated="left" />
        <div className="header">{name}</div>
        <div className="meta">
          {`added ${distanceInWordsToNow(date, { addSuffix: true })}`}
        </div>
        <div className="description">
          <List relaxed>
            {email && (
              <List.Item>
                <List.Icon name="mail" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{email}</List.Header>
                </List.Content>
              </List.Item>
            )}
            {phone && (
              <List.Item>
                <List.Icon name="phone" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{phone}</List.Header>
                </List.Content>
              </List.Item>
            )}
          </List>
          <div
            className={`ui label mini basic ${
              type === 'personal' ? 'teal' : 'yellow'
            }`}
            style={{ textTransform: 'uppercase' }}
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
