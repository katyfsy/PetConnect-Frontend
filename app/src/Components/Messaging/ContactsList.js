import React, {useState} from 'react';
import Contact from './Contact';

const ContactsList = ({privateChats, setCurrentContact}) => {
  // will have list of contacts list
  // on click, send get request to server for conversation between you and this contact
  // also change a state to change the view of the MessagesBox to show the past messages
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
        <div>Contact List</div>
        <ul>
          {currentList}
        </ul>
      </>}
    </div>
  )
}

export default ContactsList;