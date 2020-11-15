import React, { Component } from 'react'
import PropTypes from 'prop-types';
import * as db from './data'
import * as validation from './validation';

class AddEditContact extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    handleAddContact: PropTypes.func.isRequired,
    handleEditContact: PropTypes.func.isRequired,
    contactId: PropTypes.number
  }

  static defaultProps = {
    contactId: undefined
  }

  state = {
    id: Date.now(),
    name: '',
    phone: '',
    email: '',
    isEmailValid: true,
    isNameValid: true,
    isPhoneValid: true
  }

  componentDidMount() {
    const { contactId } = this.props;
    if (contactId) {
      const contact = db.getContactById(contactId);
      this.setState({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
      });
    }
  }

  hanldeChange = (event) => {
    const { name, value } = event.target
    
    // ტელეფონის ფილდში არ ჩაიწერება სხვა სიმბოლო გარდა ციფრებისა 
    if (name === 'phone' && value.length > 0 && !value.match(/^[0-9]+$/)) return null;

    this.setState(
      {
        [name]: value,
      },
      () => {}
    )
  }

  validateForm = () => {
    const {
      name,
      phone,
      email,
    } = this.state;

    let isFormValid = true;

    if (!validation.validateEmail(email)) {
      this.setState({ isEmailValid: false });
      isFormValid = false;
    } else {
      this.setState({ isEmailValid: true });
    }

    if (!validation.validateName(name)) {
      this.setState({ isNameValid: false })
      isFormValid = false;
    } else {
      this.setState({ isNameValid: true })
    }

    if (!validation.validatePhone(phone)) {
      this.setState({ isPhoneValid: false })
      isFormValid = false;
    } else {
      this.setState({ isPhoneValid: true })
    }

    return isFormValid;
  }

  save = () => {
    const { handleAddContact, close } = this.props;

    if (!this.validateForm()) return false;

    db.addContact(this.state);
    handleAddContact(this.state);
    close();
  }

  edit = () => {
    const { handleEditContact, close } = this.props;

    if (!this.validateForm()) return false;

    db.editContact(this.state);
    handleEditContact();
    close();
  }

  render() {
    const { contactId, close } = this.props;
    const {
      name,
      phone,
      email,
      isEmailValid,
      isNameValid,
      isPhoneValid
    } = this.state;

    return (
      <div className='container filter-form'>
        <h4>
          { contactId ? (
            <>კონტაქტის რედაქტირება</>
          ) : (
            <>კონტაქტის დამატება</>
          ) }
        </h4>
        <hr />
        <br />
        <form>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>დასახელება</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              value={name}
              name='name'
              onChange={this.hanldeChange}
            />
            { !isNameValid && <span className='text-danger'>{ validation.validationMesages.name }</span> }
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ტელეფონი</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={phone}
              name='phone'
              onChange={this.hanldeChange}
            />
            { !isPhoneValid && <span className='text-danger'>{ validation.validationMesages.phone }</span> }
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>ელ.ფოსტა</label>
            <input
              type='text'
              className='form-control'
              id='exampleInputPassword1'
              value={email}
              name='email'
              onChange={this.hanldeChange}
            />
            { !isEmailValid && <span className='text-danger'>{ validation.validationMesages.email }</span> }
          </div>
          <button
            type='button'
            className='btn btn-primary mr-1'
            onClick={contactId ? this.edit : this.save}
          >
            { contactId ? (
              <>რედაქტირება</>
            ) : (
              <>დამატება</>
            ) }
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => close()}
          >
            დახურვა
          </button>
        </form>
      </div>
    )
  }
}

export default AddEditContact;
