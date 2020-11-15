import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ContactListItem from './contact-list-item/ContactListItem'
import './ContactList.css'

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ),
    handleRemoveContact: PropTypes.func.isRequired,
    showEditForm: PropTypes.func.isRequired
  }

  render() {
    const {
      contacts,
      handleRemoveContact,
      showEditForm
    } = this.props;

    return (
      <div className='container'>
        <h4>კონტაქტები</h4>
        <hr />
        <br />
        <div>
          {contacts &&
            contacts.map((contact) => (
              <ContactListItem
                key={contact.id}
                contact={contact}
                removeContact={handleRemoveContact}
                editContact={showEditForm}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default ContactList;
