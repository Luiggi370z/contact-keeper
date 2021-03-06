import React, { useContext, useState } from 'react'
import Contacts from 'components/contacts/Contacts'

import ContactFilter from 'components/contacts/ContactFilter'
import { ContactContext } from 'context/contact'
import ContactModal from 'components/contacts/ContactModal'

const Home = () => {
  const contactContext = useContext(ContactContext)
  const { contacts } = contactContext
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(!openModal)

  return (
    <div className="ui grid container">
      <div className="row">
        <h2>
          My Contacts
          <span style={{ color: 'gray', marginLeft: '8px' }}>
            {contacts && contacts.length}
          </span>
        </h2>
      </div>

      <div className="ui stackable row grid container">
        <div className="row">
          <div className="eight wide column">
            <ContactFilter />
          </div>
          <div className="eight wide column">
            <ContactModal
              openModal={openModal}
              handleOpenModal={handleOpenModal}
            />
          </div>
        </div>
      </div>

      <div className="ui divider grid" />
      <div className="row">
        <Contacts />
      </div>
    </div>
  )
}

export default Home
