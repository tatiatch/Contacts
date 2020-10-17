
// const contactData = [
//     {
//       id: 1,
//       name: 'Zaza Beridze',
//       phone: '111111111',
//       email: 'zaza@gmail.com'
//     },
//     {
//       id: 2,
//       name: 'Eka maisuradze',
//       phone: '222222222',
//       email: 'eka@gmail.com'
//     },
//     {
//       id: 3,
//       name: 'Nino Baratashvili',
//       phone: '333333333',
//       email: 'nino@gmail.com'
//     }
//   ]

  export function getContacts(){
     const contacts = JSON.parse(localStorage.getItem('contacts')) || []
     return contacts
  }

  export function addContact(contact){
      const contacts = getContacts()
      const contactArray = [...contacts, contact]
      localStorage.setItem('contacts', JSON.stringify(contactArray))
  }