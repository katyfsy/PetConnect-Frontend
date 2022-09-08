import React, { useState } from 'react';
import Contact from './Contact';
import ListGroup from 'react-bootstrap/ListGroup';


const ContactsList = ({ privateChats, setCurrentContact, notificationList, username, setNotificationList, currentContact }) => {

  let currentList = [...privateChats.keys()].map((contact) => {
    if (contact) {
      return (
        <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} notificationList={notificationList} setNotificationList={setNotificationList} username={username} currentContact={currentContact} />
      )
    }
  })

  return (
    <div>
      {privateChats.keys().length === 0 ?
        <div>Message someone to add contacts.</div> :
        <>
          <div style={{ "font-weight": "bold" }}>Contact List</div>
          <ListGroup>
            {currentList}
          </ListGroup>
        </>}
    </div>
  )
}

export default ContactsList;