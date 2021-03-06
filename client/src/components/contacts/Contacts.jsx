import React, { useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactItem from './ContactItem'
import ContactsPlaceholder from './ContactsPlaceholder'
import ContactsEmpty from './ContactsEmpty'
import ContactModal from './ContactModal'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const { contacts, filtered, getContacts, loading, filter } = contactContext

  useEffect(() => {
    getContacts()
    //eslint-disable-next-line
  }, [])

  if (contacts && !contacts.length && !loading)
    return (
      <ContactsEmpty message="No contacts found. Try to add one!" icon="user">
        <ContactModal />
      </ContactsEmpty>
    )

  if (filtered && !filtered.length && !loading)
    return (
      <ContactsEmpty
        message={`No contact with name or email '${filter}' were found`}
        icon="address book"
      />
    )

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
        <ContactsPlaceholder />
      )}
    </div>
  )
}

export default Contacts
