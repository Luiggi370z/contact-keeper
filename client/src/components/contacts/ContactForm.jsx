import React, { useState, useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { InputField, ButtonGroupField } from 'components/ui'

const genderOptions = [
  {
    label: 'Male',
    value: 'M',
  },
  {
    label: 'Female',
    value: 'F',
  },
]

const typeOptions = [
  {
    label: 'Family',
    value: 'family',
  },
  {
    label: 'Personal',
    value: 'personal',
  },
  {
    label: 'Professional',
    value: 'professional',
  },
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

  const { currentContact, addContact, updateContact } = contactContext

  const { setAlert } = alertContext

  useEffect(() => {
    setContact(currentContact || initialContact)
  }, [contactContext, currentContact])

  const [contact, setContact] = useState(initialContact)

  const { name, email, phone, type, gender } = contact

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value })

  const onCancel = () => onComplete()

  const onDiscard = () => setContact(currentContact)

  const onSubmit = e => {
    e.preventDefault()

    if (currentContact) {
      updateContact(contact)
      setAlert('Contact has been updated successfully.', 'positive')
    } else {
      addContact({ ...contact, avatarUrl: generateAvatar(gender) })
      setAlert('Contact has been added successfully.', 'positive')
    }
    onComplete()
  }

  const currentContactHasChanged =
    currentContact && JSON.stringify(currentContact) !== JSON.stringify(contact)

  return (
    <form className="ui equal width form" onSubmit={onSubmit}>
      <h2 className="ui dividing header">
        <div className="content">
          {`${contact._id ? 'Edit' : 'New'} Contact`}
        </div>
      </h2>
      <br />
      <InputField
        icon="user"
        name="name"
        placeholder="First and Last name"
        required
        value={name}
        onChange={onChange}
      />
      <div className="fields">
        <InputField
          icon="envelope"
          name="email"
          placeholder="E-mail address"
          required
          value={email}
          onChange={onChange}
        />
        <InputField
          icon="phone"
          name="phone"
          placeholder="Phone number"
          required
          value={phone}
          onChange={onChange}
        />
      </div>
      <div className="fields">
        <ButtonGroupField
          disabled={!!contact._id}
          field="gender"
          selectedValue={gender}
          icon="venus mars"
          options={genderOptions}
          onChange={onChange}
        />
        <ButtonGroupField
          field="type"
          selectedValue={type}
          icon="tag"
          options={typeOptions}
          onChange={onChange}
        />
      </div>
      <br />
      <div className="ui divider" />
      <div className="ui right aligned container">
        <button
          type="button"
          className="ui button left floated basic"
          onClick={onCancel}
        >
          Cancel
        </button>
        {currentContact && (
          <button
            className={`ui button secondary ${
              !currentContactHasChanged ? 'disabled' : ''
            }`}
            type="button"
            onClick={onDiscard}
          >
            Discard
            {currentContactHasChanged}
          </button>
        )}
        <input
          className="ui button primary"
          type="submit"
          value={`${currentContact ? 'Update' : 'Add'}`}
        />
      </div>
    </form>
  )
}

export default ContactForm
