import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import './Contact.css';

const Contact = ({ contact, setCurrentContact, notificationList, setNotificationList, username, currentContact }) => {
  const markAsRead = (username) => {
    axios.patch(`http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${contact}/${username}`)
      // axios.patch(`http://localhost:8080/messages/notifications/${contact}/${username}`)
      .then((response) => {
        setNotificationList(notificationList.filter((value) => { return value !== contact }));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  let listItem;
  currentContact === contact ?
  listItem =
  <li
    className='member'
    style={{
      backgroundColor: '#FBE8A6',
      color: notificationList && notificationList.includes(contact) ? 'red' : 'black',
    }}
    onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
    {contact}
  </li> :
  listItem =
  <li
    className='member'
    style={{
      color: notificationList && notificationList.includes(contact) ? 'red' : 'black',
    }}
    onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
    {contact}
  </li>

  return (
    listItem
  )
}

export default Contact;