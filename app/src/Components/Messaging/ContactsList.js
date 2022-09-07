import React, { useState } from 'react';
import Contact from './Contact';

const ContactsList = ({ privateChats, setCurrentContact, notificationList, username }) => {
  // let currentList = [...privateChats.keys()].map((contact) => {
  //   return (
  //     <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} />
  //   )
  // })

  let currentList = [...privateChats.keys()].map((contact) => {
    if (contact) {
      let notification = false;
      if (notification && notificationList.includes(contact)) {
        notification = true;
      }
      return (
        <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} notification={notification} username={username} />
      )
    }
  })

  return (
    <div>
      {privateChats.keys().length === 0 ?
        <div>Message someone to add contacts.</div> :
        <>
          <div style={{ "font-weight": "bold" }}>Contact List</div>
          <ul>
            {currentList}
          </ul>
        </>}
    </div>
  )
}

export default ContactsList;