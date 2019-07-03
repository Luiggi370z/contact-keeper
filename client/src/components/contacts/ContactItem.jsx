import React from 'react'
import PropTypes from 'prop-types'

import { Card, List, Button } from 'semantic-ui-react'

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact

  return (
    <Card link>
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
        <Button basic floated="left">
          Delete
        </Button>
        <Button primary floated="right">
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
