export function getContacts(){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || []
    return contacts
}

export function getContactById(contactId) {
    const contacts = getContacts();
    return contacts.find(contact => contact.id === contactId);
}

export function addContact(contact){
    const contacts = getContacts()
    const contactArray = [...contacts, contact]
    localStorage.setItem('contacts', JSON.stringify(contactArray))
}

export function editContact(newContact) {
    const contacts = getContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === newContact.id);
    contacts[contactIndex] = newContact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

export function deleteContact(contactId) {
    const contacts = getContacts();
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
}
