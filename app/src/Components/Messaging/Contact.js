import React from 'react';
import axios from 'axios';
import './css/Contact.css';
// import { BsFillExclamationCircleFill } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from 'react-icons/md';

const Contact = ({
  contact,
  setCurrentContact,
  notificationList,
  setNotificationList,
  username,
  currentContact,
  photo,
}) => {
  const markAsRead = (username, contact) => {
    axios
      .patch(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${contact}/${username}`
      )
      // axios.patch(`http://localhost:8080/messages/notifications/${contact}/${username}`)
      .then((response) => {
        setNotificationList(
          notificationList.filter((value) => {
            return value !== contact;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let listItem;
  currentContact === contact
    ? (listItem = (
        <li
          className='member'
          style={{
            backgroundColor: '#F4976C',
          }}
        >
          <div className='left'>
            <img
              className='align-image'
              src={photo.toString()}
              alt='contact_image'
              width='50'
              height='50'
            />
            {notificationList.includes(currentContact)
              ? markAsRead(username, contact)
              : null}
            {contact}
          </div>
        </li>
      ))
    : (listItem = (
        <li
          className='member'
          onClick={() => {
            setCurrentContact(contact);
            markAsRead(username, contact);
          }}
        >
          <div className='left'>
            <img
              className='align-image'
              src={photo.toString()}
              alt='contact_image'
              width='50'
              height='50'
            />
            {contact}
          </div>
          {notificationList && notificationList.includes(contact) && (
            <MdOutlineMarkEmailUnread
              className='right'
              style={{ color: 'orange' }}
            />
          )}
        </li>
      ));

  return listItem;
};

export default Contact;
