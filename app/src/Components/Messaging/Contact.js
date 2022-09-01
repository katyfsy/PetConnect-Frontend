import React from 'react';

const Contact = ({contact, setCurrentContact}) => {

  return (
    <li onClick={() => {setCurrentContact(contact)}}>
      {contact}
    </li>

  )
}

export default Contact;