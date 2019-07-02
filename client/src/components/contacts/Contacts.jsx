import React, { useContext } from 'react'
import { ContactContext } from 'context/contact'

import { Card } from 'semantic-ui-react'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts } = contactContext
  return (
    <Card.Group centered>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </Card.Group>
  )
}

export default Contacts
