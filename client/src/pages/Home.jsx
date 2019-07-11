import React, { useContext, useEffect, useState } from 'react'
import Contacts from 'components/contacts/Contacts'
import ContactForm from 'components/contacts/ContactForm'
import ContactFilter from 'components/contacts/ContactFilter'
import { AuthContext } from 'context/auth'
import { ContactContext } from 'context/contact'
import { Modal } from 'semantic-ui-react'

const Home = () => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { contacts } = contactContext
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  const handleOpenModal = () => setOpenModal(!openModal)
  const AddContact = () => (
    <button
      className="ui fluid button primary"
      type="button"
      onClick={handleOpenModal}
    >
      <i className="icon add" />
      Add Contact
    </button>
  )

  const ContactModal = () => (
    <Modal
      trigger={<AddContact />}
      closeIcon
      open={openModal}
      onClose={handleOpenModal}
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <ContactForm onComplete={handleOpenModal} />
      </Modal.Content>
    </Modal>
  )

  return (
    <div className="ui grid container">
      <div className="row">
        <h2>
          My Contacts
          <span style={{ color: 'gray', marginLeft: '7px' }}>
            {contacts && contacts.length}
          </span>
        </h2>
      </div>
      <div className="ui stackable row grid container">
        <div className="row">
          <div className="eight wide column">Presets</div>
          <div className="five wide column">
            <ContactFilter />
          </div>
          <div className="three wide column">
            <ContactModal />
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
