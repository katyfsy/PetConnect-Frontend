import React from 'react';
import axios from 'axios'

const Contact = ({ contact, setCurrentContact, notificationList, setNotificationList, username }) => {
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


  return (
    <li
      style={{
        color: notificationList && notificationList.includes(contact) ? 'red' : 'black',
      }}
      onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
      {contact}
    </li>

  )
}

export default Contact;