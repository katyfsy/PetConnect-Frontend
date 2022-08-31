import React, {useState} from 'react';

const ContactsList = () => {
  const [contacts, setContacts] = useState(["Ivy", "Ginwoo", "Rick", "Yu"]);
  // on click, send get request to server for conversation between you and this contact
  // also change a state to change the view of the MessagesBox to show the past messages
  return (
    <div>
      {contacts.map((contact) => {
        return <li>{contact}</li>
      })}
    </div>
  )
}

export default ContactsList;