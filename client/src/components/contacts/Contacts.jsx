import React, { useContext } from 'react'
import { ContactContext } from 'context/contact'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Card } from 'semantic-ui-react'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered } = contactContext

  if (!contacts.length) return <h2>No contacts</h2>

  const contactsList = filtered || contacts

  return (
    <Card.Group centered stackable>
      <TransitionGroup component={null}>
        {contactsList.map(contact => (
          <CSSTransition
            key={contact.id}
            timeout={500}
            classNames="item"
            in
            appear
          >
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Card.Group>
  )
}

export default Contacts
