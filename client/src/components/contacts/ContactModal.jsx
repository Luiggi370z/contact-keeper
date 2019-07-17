import React, { useContext } from 'react'
import ContactForm from 'components/contacts/ContactForm'
import { ContactContext } from 'context/contact'
import { Modal } from 'semantic-ui-react'

const AddContact = ({ handleOpenModal }) => (
  <button
    className="ui right floated button primary"
    type="button"
    onClick={handleOpenModal}
  >
    <i className="icon add" />
    Add Contact
  </button>
)

const ContactModal = () => {
  const contactContext = useContext(ContactContext)
  const {
    isModalOpen,
    toggleContactModal,
    clearCurrentContact,
  } = contactContext

  const closeModal = () => {
    toggleContactModal(false)
    clearCurrentContact()
  }
  const openModal = () => toggleContactModal(true)

  return (
    <Modal
      trigger={<AddContact handleOpenModal={openModal} />}
      closeIcon
      size="small"
      open={isModalOpen}
      onClose={closeModal}
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <ContactForm onComplete={closeModal} />
      </Modal.Content>
    </Modal>
  )
}

export default ContactModal
