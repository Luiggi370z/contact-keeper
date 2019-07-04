import React from 'react'
import Contacts from 'components/contacts/Contacts'
import ContactForm from 'components/contacts/ContactForm'
import ContactFilter from 'components/contacts/ContactFilter'

const Home = () => {
  return (
    <div>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
