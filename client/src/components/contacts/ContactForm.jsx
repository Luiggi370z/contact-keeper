import React, { useState, useContext, useEffect } from 'react'
import { ContactContext } from 'context/contact'
import { AlertContext } from 'context/alert'
import { RadioButtonList, InputField } from 'components/ui'

const typeOptions = [
  { label: 'Personal', value: 'personal' },
  { label: 'Professional', value: 'professional' },
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

  const onCancel = () => {
    clearAll()
    onComplete()
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
      <h2 className="ui dividing header">
        {`${contact._id ? 'Edit' : 'New'} Contact`}
      </h2>
      <InputField
        required
        field="name"
        label="Name"
        value={name}
        onChange={onChange}
      />
      <div className="fields">
        <div className="eight wide field">
          <InputField
            required
            field="email"
            label="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="eight wide field">
          <InputField
            required
            field="phone"
            label="Phone"
            value={phone}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="fields">
        <div className={`eight wide field ${contact._id ? 'disabled' : ''}`}>
          <label htmlFor="gender">Gender</label>
          <div id="gender" className="ui large buttons">
            <button
              className={`ui icon button ${
                gender === 'M' ? 'active primary' : ''
              }`}
              type="button"
              value="M"
              name="gender"
              onClick={onChange}
            >
              <i className="male icon" style={{ pointerEvents: 'none' }} />
            </button>
            <div className="or" />
            <button
              className={`ui icon button ${
                gender === 'F' ? 'active primary' : ''
              }`}
              type="button"
              value="F"
              name="gender"
              onClick={onChange}
            >
              <i className="female icon" style={{ pointerEvents: 'none' }} />
            </button>
          </div>
        </div>
        <div className="eight wide field">
          <label htmlFor="types">Contact Type</label>
          <div id="types" className="ui large buttons">
            <button
              className={`ui icon button ${
                type === 'personal' ? 'active primary' : ''
              }`}
              type="button"
              value="personal"
              name="type"
              onClick={onChange}
            >
              Personal
            </button>
            <button
              className={`ui icon button ${
                type === 'professional' ? 'active primary' : ''
              }`}
              type="button"
              value="professional"
              name="type"
              onClick={onChange}
            >
              Professional
            </button>
          </div>
        </div>
      </div>
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
            className="ui button secondary"
            type="button"
            onClick={clearAll}
          >
            Discard
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
