import React from 'react'
import ContactModal from './ContactModal'

const ContactsEmpty = () => (
  <div
    className="ui placeholder basic padded segment"
    style={{ width: '100%' }}
  >
    <div className="ui center aligned icon medium header">
      <i className="circular user outline icon" />
    </div>
    <h3 style={{ opacity: 0.45, marginTop: 0, textAlign: 'center' }}>
      No contacts found. Try to add one!
    </h3>
    <ContactModal />
  </div>
)

export default ContactsEmpty
