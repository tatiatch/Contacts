import React from 'react'
import Header from "./Header"
import ContactList from './contact-list/ContactList'
import AddContact from './AddContact'
import * as db from './data'
import './App.css'

class App extends React.Component {

  state = {
      contacts: null,
      isEnable: true,
      searchValue:'',
      addForm: false
  }

  componentDidMount(){
    const data = db.getContacts()
    this.setState({contacts: data})
  }

  // componentDidUpdate(){
  //   console.log('componentDidUpdate')
  // }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter(x => x.id !== id)
    this.setState({ contacts: contactData})
  }

  handleSearch=(event)=>{
     const contacts = contacts.filter(x=>x.name.toUpperCase().includes(event.target.value.toUpperCase()))
     this.setState({
       searchValue: event.target.value,
       contacts
    })
  }

  handleClose = () => {
    this.setState({addForm:false})
  }

  handleRemoveContact = (id)=>{
     console.log('id', id)
  }

  render() {
    return <>
      <Header />
      <Search />
      {
        this.state.addForm ? 
        <AddContact close = {this.handleClose}/> : 
        <ContactList 
           contacts={this.state.contacts}  handleRemoveContact = {this.handleRemoveContact}
        />
      }

    </>
  }
}
export default App
