import React, { useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Loader } from 'semantic-ui-react'
import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered, getContacts, loading } = contactContext

  useEffect(() => {
    getContacts()
    //eslint-disable-next-line
  }, [])

  if (contacts && !contacts.length && !loading) return <h2>No contacts</h2>

  const contactsList = filtered || contacts

  return (
    <div className="ui container doubling stackable three column grid">
      {contacts && !loading ? (
        <TransitionGroup component={null}>
          {contactsList.map(contact => (
            <CSSTransition
              key={contact._id}
              timeout={500}
              classNames="item"
              in
              appear
            >
              <div className="column">
                <ContactItem contact={contact} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Loader active inline="centered" size="large" />
      )}
    </div>
  )
}

export default Contacts
