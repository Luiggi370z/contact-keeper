import React from 'react'

const ContactsEmpty = ({ icon, message, children }) => (
  <div
    className="ui placeholder basic padded segment"
    style={{ width: '100%' }}
  >
    <div className="ui center aligned icon medium header">
      <i className={`circular ${icon} outline icon`} />
    </div>
    <h3 style={{ opacity: 0.45, marginTop: 0, textAlign: 'center' }}>
      {message}
    </h3>
    {children}
  </div>
)

export default ContactsEmpty
