import React from 'react'
import Contacts from 'components/contacts/Contacts'
import ContactForm from 'components/contacts/ContactForm'

const Home = () => {
  return (
    <div>
      <div>
        <ContactForm />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home
