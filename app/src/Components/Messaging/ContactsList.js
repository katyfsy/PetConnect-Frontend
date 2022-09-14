import React from 'react';
import Contact from './Contact';
import './css/ContactsList.css';

const ContactsList = ({
  privateChats,
  currentContact,
  setCurrentContact,
  notificationList,
  username,
  setNotificationList,
}) => {
  let contactsSortedByRecentMessage = [...privateChats]
    .sort(([k, v], [k2, v2]) => {
      if (v[v.length - 1].timestamp > v2[v2.length - 1].timestamp) {
        return -1;
      }
      if (v[v.length - 1].timestamp < v2[v2.length - 1].timestamp) {
        return 1;
      }
      return 0;
    })
    .map((name) => {
      
      return name[0];
    });

  // let currentList = [...privateChats.keys()].sort().map((contact) => {
  let currentList = contactsSortedByRecentMessage.map((contact) => {
    if (contact) {
      // verify sender vs receiver
      // let photo = username === privateChats.get(contact)[privateChats.get(contact).length-1]['senderName'] ? privateChats.get(contact)[0]['receiverPhoto'] : privateChats.get(contact)[0]['senderPhoto']
      let photo =
        username === privateChats.get(contact)[0]['senderName']
          ? privateChats.get(contact)[0]['receiverPhoto']
          : privateChats.get(contact)[0]['senderPhoto'];
      return (
        <Contact
          key={contact}
          photo={photo}
          contact={contact}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          notificationList={notificationList}
          setNotificationList={setNotificationList}
          username={username}
        />
      );
    }
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {privateChats.keys().length === 0 ? (
        <div>Message someone to add contacts.</div>
      ) : (
        <div className='contact-list'>
          <div className='list-title'>Contact List</div>
          <ul className='list'>{currentList}</ul>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
