import React, { useState } from 'react';
import Contact from './Contact';
import ListGroup from 'react-bootstrap/ListGroup';


// const ContactsList = ({ privateChats, setCurrentContact, notificationList, username, setNotificationList, currentContact }) => {

//   let currentList = [...privateChats.keys()].map((contact) => {
//     if (contact) {
//       return (
//         <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} notificationList={notificationList} setNotificationList={setNotificationList} username={username} currentContact={currentContact} />
//       )
//     }
//   })

const ContactsList = ({ privateChats, setCurrentContact, notificationList, username, setNotificationList }) => {

  let currentList = [...privateChats.keys()].sort().map((contact) => {
    if (contact) {
      // verify sender vs receiver
      // let photo = username === privateChats.get(contact)[privateChats.get(contact).length-1]['senderName'] ? privateChats.get(contact)[0]['receiverPhoto'] : privateChats.get(contact)[0]['senderPhoto']
      let photo = username === privateChats.get(contact)[0]['senderName'] ? privateChats.get(contact)[0]['receiverPhoto'] : privateChats.get(contact)[0]['senderPhoto']
      return (
        <Contact key={contact} photo={photo} contact={contact} setCurrentContact={setCurrentContact} notificationList={notificationList} setNotificationList={setNotificationList} username={username} />
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