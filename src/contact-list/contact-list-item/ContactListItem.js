import React from 'react'
import PropTypes from 'prop-types';
import './ContactListItem.css'

function ContactListItem({ contact: { id, name }, removeContact, editContact }) {
  return (
    <div className='card mt-3'>
      <div className='card-body'>
        {name}
        <button
          className='btn btn-danger float-right'
          onClick={() => removeContact(id)}
        >
          X
        </button>
        <button
          className='btn btn-danger float-right'
          onClick={() => editContact(id)}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  editContact: PropTypes.func.isRequired,
  removeContact: PropTypes.func.isRequired
}

export default ContactListItem;
