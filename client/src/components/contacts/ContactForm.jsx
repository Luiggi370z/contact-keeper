import React, { useState, useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { RadioButtonList, InputField } from 'components/ui'

const typeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Professional', value: 'professional' },
]

const initialContact = { name: '', email: '', phone: '', type: 'personal' }

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const {
    addContact,
    clearCurrentContact,
    currentContact,
    updateContact,
  } = contactContext

  useEffect(() => {
    setContact(currentContact || initialContact)
  }, [contactContext, currentContact])

  const [contact, setContact] = useState(initialContact)

  const { name, email, phone, type } = contact

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const clearAll = () => {
    clearCurrentContact()
  }

  const onSubmit = e => {
    e.preventDefault()

    if (currentContact) updateContact(contact)
    else addContact(contact)

    clearAll()
  }

  return (
    <form className="ui form" onSubmit={onSubmit}>
      <h2>{`${contact.id ? 'Edit' : 'New'} Contact`}</h2>
      <h4 className="ui dividing header">Basic Information</h4>
      <InputField field="name" label="Name" value={name} onChange={onChange} />
      <InputField
        field="email"
        label="Email"
        value={email}
        onChange={onChange}
      />
      <InputField
        field="phone"
        label="Phone"
        value={phone}
        onChange={onChange}
      />

      <h4 className="ui dividing header">Contact Type</h4>
      <RadioButtonList
        selectedValue={type}
        field="type"
        options={typeOptions}
        onChange={onChange}
      />

      {currentContact && (
        <button className="ui button basic" type="button" onClick={clearAll}>
          Discard
        </button>
      )}
      <input
        className="ui button primary"
        type="submit"
        value={`${currentContact ? 'Update' : 'Add'} Contact`}
      />
    </form>
  )
}

export default ContactForm
