import React from 'react';
import axios from 'axios'

const Contact = ({ contact, setCurrentContact, notification, username }) => {
  const markAsRead = (username) => {
    console.log('Username in markAsRead:', username)
    axios.get(`http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${contact}/${username}`)
      // axios.patch(`http://localhost:8080/messages/notifications/${contact}/${username}`)

      .then((response) => {
        // console.log(response.data)
        // setPrivateChats(new Map(Object.entries(response.data)));
        notification = false;
      })
      .catch((err) => {
        console.log(err);
      })
  }


  return (
    <li
      style={{
        color: notification ? 'red' : 'black',
      }}
      // onClick={() => { setCurrentContact(contact) }}>
      onClick={() => { setCurrentContact(contact); markAsRead(username); }}>
      {console.log(notification)}
      {contact}
    </li>

  )
}

export default Contact;