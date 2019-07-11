import React, { useContext, useRef, useEffect } from 'react'
import { ContactContext } from 'context/contact'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const { filterContacts, clearFilter, filtered } = contactContext
  const text = useRef('')

  useEffect(() => {
    if (!filtered) text.current.value = ''
  })

  const onChange = e => {
    if (text.current.value) filterContacts(e.target.value)
    else clearFilter()
  }

  return (
    <form>
      <div className="ui search fluid">
        <div className="ui fluid left icon input">
          <input
            className="prompt"
            type="text"
            ref={text}
            onChange={onChange}
            placeholder="Search by name or email..."
          />
          <i className="search icon" />
        </div>
      </div>
    </form>
  )
}

export default ContactFilter
