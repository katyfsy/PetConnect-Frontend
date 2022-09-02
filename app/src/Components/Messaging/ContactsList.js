import React, {useState} from 'react';
import Contact from './Contact';

const ContactsList = ({username, privateChats, setCurrentContact}) => {
  let currentList = [...privateChats.keys()].map((contact) => {
  return (
    <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact}/>
  )
  })

  return (
    <div>
    {privateChats.keys().length === 0 ?
      <div>Message someone to add contacts.</div> :
      <>
        <div style={{"font-weight":"bold"}}>Contact List</div>
        <ul>
          {currentList}
        </ul>
      </>}
    </div>
  )
}

export default ContactsList;