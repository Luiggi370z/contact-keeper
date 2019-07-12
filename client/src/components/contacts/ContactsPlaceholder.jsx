import React from 'react'

const ContactCardPlaceholder = () => (
  <div className="ui card">
    <div className="content">
      <div className="ui placeholder">
        <div className="image header">
          <div className="line" />
          <div className="line" />
        </div>
        <div className="paragraph">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </div>
    </div>
  </div>
)

const ContactsPlaceholder = () => (
  <div className="ui container doubling stackable three column grid">
    <div className="column">
      <ContactCardPlaceholder />
    </div>
    <div className="column">
      <ContactCardPlaceholder />
    </div>
    <div className="column">
      <ContactCardPlaceholder />
    </div>
  </div>
)

export default ContactsPlaceholder
