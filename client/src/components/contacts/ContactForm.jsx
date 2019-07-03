import React, { useState, useContext } from 'react'
import { ContactContext } from 'context/contact'

const typeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Professional', value: 'professional' },
]

const initialContact = { name: '', email: '', phone: '', type: 'personal' }

const InputField = ({ field, label, ...props }) => (
  <div className="field">
    <label htmlFor={field}>{label}</label>
    <input id={field} name={field} type="text" {...props} />
  </div>
)

const RadioButtonList = ({ selectedValue, field, options, onChange }) => (
  <div className="inline fields">
    {options.map(option => (
      <div className="field" key={option.value}>
        <div className="ui radio checkbox">
          <input
            id={option.value}
            type="radio"
            name={field}
            value={option.value}
            checked={selectedValue === option.value}
            tabIndex="0"
            className="hidden"
            onChange={onChange}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      </div>
    ))}
  </div>
)

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const [contact, setContact] = useState(initialContact)

  const { name, email, phone, type } = contact

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()

    contactContext.addContact(contact)
    setContact(initialContact)
  }

  return (
    <form className="ui form" onSubmit={onSubmit}>
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

      <input className="ui button primary" type="submit" value="Add Contact" />
    </form>
  )
}

export default ContactForm
