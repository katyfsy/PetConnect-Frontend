import React from 'react';
import Contact from './Contact';
import './ContactsList.css';

// const ContactsList = ({ privateChats, setCurrentContact, notificationList, username, setNotificationList, currentContact }) => {

//   let currentList = [...privateChats.keys()].map((contact) => {
//     if (contact) {
//       return (
//         <Contact key={contact} contact={contact} setCurrentContact={setCurrentContact} notificationList={notificationList} setNotificationList={setNotificationList} username={username} currentContact={currentContact} />
//       )
//     }
//   })

const ContactsList = ({
  privateChats,
  currentContact,
  setCurrentContact,
  notificationList,
  username,
  setNotificationList,
}) => {
  //   var mapAsc = new Map([...privateChats.entries()].sort((a,b)=>{
  //     return new Date(b) - new Date(a);
  // }));
  // console.log('mapAsc: ', mapAsc);

  let currentList = [...privateChats.keys()].sort().map((contact) => {
    // console.log('key', );
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
