import React, { useState } from 'react';
import Contact from './Contact';
import ListGroup from 'react-bootstrap/ListGroup';
import './ContactsList.css';


const ContactsList = ({ privateChats, setCurrentContact, notificationList, username, setNotificationList, currentContact }) => {

  let currentList = [...privateChats.keys()].map((contact) => {
    if (contact) {
      return (
        <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} notificationList={notificationList} setNotificationList={setNotificationList} username={username} currentContact={currentContact} />
      )
    }
  })

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {privateChats.keys().length === 0 ?
        <div>Message someone to add contacts.</div> :
        <div className='contact-list'>
          <div className='list-title'>Contact List</div>
          <ul className='list'>
            {currentList}
          </ul>
        </div>}
    </div>
  )
}

export default ContactsList;