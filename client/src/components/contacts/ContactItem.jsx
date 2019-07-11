import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { Card, List, Button } from 'semantic-ui-react'

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)

  const { _id: id, name, email, phone, type } = contact
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact,
  } = contactContext
  const { setAlert } = alertContext

  const onDeleteContact = () => {
    deleteContact(id)
    setAlert('Contact was removed successfully', 'positive')
    clearCurrentContact()
  }
  const onEditContact = () => setCurrentContact(contact)

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <div
            className={`ui label mini basic ${
              type === 'personal' ? 'teal' : 'yellow'
            }`}
            style={{ textTransform: 'uppercase' }}
          >
            {type}
          </div>
        </Card.Meta>
        <Card.Description>
          <div className="ui inverted dimmer" />
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
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic floated="left" onClick={onDeleteContact}>
          Delete
        </Button>
        <Button primary floated="right" onClick={onEditContact}>
          Edit
        </Button>
      </Card.Content>
    </Card>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.instanceOf(Object).isRequired,
}

export default ContactItem
