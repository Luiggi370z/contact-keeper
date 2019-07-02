import React from 'react'
import { Card, List, Button } from 'semantic-ui-react'

const ContactItem = ({ contact }) => {
  const { id, name, email, phone, type } = contact

  return (
    <Card link>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <div
            className="ui label teal small basic"
            style={{ textTransform: 'capitalize' }}
          >
            {type}
          </div>
        </Card.Meta>
        <Card.Description>
          <List divided relaxed>
            <List.Item>
              <List.Icon name="mail" verticalAlign="middle" />
              <List.Content>
                <List.Header>{email}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="phone" verticalAlign="middle" />
              <List.Content>
                <List.Header>{phone}</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic>Remove</Button>
        <Button primary>Approve</Button>
      </Card.Content>
    </Card>
  )
}

export default ContactItem
