import React, { useState, useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { RadioButtonList, InputField } from 'components/ui'

const typeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Professional', value: 'professional' },
]

const genderOptions = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
]

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
  gender: 'M',
  avatarUrl: '',
}

const generateAvatar = gender => {
  const id = Math.floor(Math.random() * 99) + 1
  return `https://randomuser.me/api/portraits/${
    gender === 'M' ? 'men' : 'women'
  }/${id}.jpg`
}

const ContactForm = ({ onComplete }) => {
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)

  const {
    addContact,
    clearCurrentContact,
    currentContact,
    updateContact,
  } = contactContext

  const { setAlert } = alertContext

  useEffect(() => {
    setContact(currentContact || initialContact)
  }, [contactContext, currentContact])

  const [contact, setContact] = useState(initialContact)

  const { name, email, phone, type, gender } = contact

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const clearAll = () => {
    clearCurrentContact()
  }

  const onSubmit = e => {
    e.preventDefault()

    if (currentContact) {
      updateContact(contact)
      setAlert('Contact has been updated successfully.', 'positive')
    } else {
      addContact({ ...contact, avatarUrl: generateAvatar(gender) })
      setAlert('Contact has been added successfully.', 'positive')
    }

    clearAll()
    onComplete()
  }

  return (
    <form className="ui form" onSubmit={onSubmit}>
      <h2>{`${contact.id ? 'Edit' : 'New'} Contact`}</h2>
      <h4 className="ui dividing header">Basic Information</h4>
      <InputField
        required
        field="name"
        label="Name"
        value={name}
        onChange={onChange}
      />
      <InputField
        required
        field="email"
        label="Email"
        value={email}
        onChange={onChange}
      />
      <InputField
        required
        field="phone"
        label="Phone"
        value={phone}
        onChange={onChange}
      />
      <RadioButtonList
        selectedValue={gender}
        field="gender"
        options={genderOptions}
        onChange={onChange}
      />

      <h4 className="ui dividing header">Contact Type</h4>
      <RadioButtonList
        selectedValue={type}
        field="type"
        options={typeOptions}
        onChange={onChange}
      />

      <button type="button" className="ui button basic" onClick={onComplete}>
        Cancel
      </button>
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
