import React from 'react';

const Contact = ({contact, contactName, setCurrentContact}) => {
  // need to change this on click to change the receiver name in main state
  return (
    <li onClick={() => {setCurrentContact(contact)}}>
      {contact}
    </li>

  )
}

export default Contact;