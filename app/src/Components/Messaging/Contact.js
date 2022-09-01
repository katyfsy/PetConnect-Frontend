import React from 'react';

const Contact = ({contact, setCurrentContact}) => {
  // return (
  //     {contact}
  // )

  return (
    <li onClick={() => {setCurrentContact(contact)}}>
      {contact}
    </li>

  )
}

export default Contact;