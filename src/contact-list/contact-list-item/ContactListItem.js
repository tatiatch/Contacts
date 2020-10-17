import React from 'react'
import './ContactListItem.css'

function ContactListItem({contact:{id,name}, removeContact}){
        return <div key={id} className='card mt-3'>
        <div className='card-body'>
        {name}
        <button className='btn btn-danger float-right' 
        onClick={()=>removeContact(id)}
        >X</button>
        </div>
    </div>
    
}

export default ContactListItem
