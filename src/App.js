import React from 'react'
import Header from './Header'
import ContactList from './contact-list/ContactList'
import ContactForm from './AddEditContact'
import Search from './search/Search'
import * as db from './data'
import './App.css'

class App extends React.Component {
  state = {
    contacts: null,
    isEnable: true,
    searchValue: '',
    showForm: false,
    editContactId: undefined,
  }

  componentDidMount() {
    const data = db.getContacts()
    this.setState({ contacts: data })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      // ძებნა. დააბრუნებს ისეთ კონტაქტებს რომლების ტელეფონი ან სახელი ან მეილი ემთხვევა საძიებო სიტყვას
      const data = db
        .getContacts()
        .filter((contact) =>
          contact.name
            .toUpperCase()
            .includes(this.state.searchValue.toUpperCase()) ||
          contact.email.includes(this.state.searchValue) ||
          contact.phone.includes(this.state.searchValue)
        )
      this.setState({ contacts: data })
    }
  }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter((x) => x.id !== id)
    this.setState({ contacts: contactData })
  }

  handleSearch = (event) => {
    const contacts = contacts.filter((x) =>
      x.name.toUpperCase().includes(event.target.value.toUpperCase())
    )
    this.setState({
      searchValue: event.target.value,
      contacts,
    })
  }

  handleClose = () => {
    this.setState({ showForm: false })
  }

  handleRemoveContact = (id) => {
    db.deleteContact(id);
    const data = db.getContacts();
    this.setState({ contacts: data });
  }

  handleShowEditForm = (id) => {
    this.setState({ showForm: true, editContactId: id });
  }

  handleEditContact = (contact) => {
    this.setState({ contacts: db.getContacts(), editContactId: undefined });
  }

  hendleShowAddForm = () => {
    this.setState({ showForm: true })
  }

  handleAddContact = (contact) => {
    this.setState({ contacts: [...this.state.contacts, contact] })
  }

  onSearch = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    return (
      <>
        <Header />
        <Search
          searchValue={this.state.searchValue}
          showAddForm={this.hendleShowAddForm}
          handleSearch={this.onSearch}
        />
        {this.state.showForm ? (
          <ContactForm
            close={this.handleClose}
            handleAddContact={this.handleAddContact}
            handleEditContact={this.handleEditContact}
            contactId={ this.state.editContactId }
          />
        ) : (
          <ContactList
            contacts={this.state.contacts}
            handleRemoveContact={this.handleRemoveContact}
            showEditForm={this.handleShowEditForm}
          />
        )}
      </>
    )
  }
}
export default App
