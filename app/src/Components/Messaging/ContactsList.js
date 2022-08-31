import React, {useState} from 'react';
import Contact from './Contact';

const ContactsList = () => {
  // will have list of contacts list
  // on click, send get request to server for conversation between you and this contact
  // also change a state to change the view of the MessagesBox to show the past messages
  const [contacts, setContacts] = useState(["Ginwoo", "Yu", "Rick"])
  return (
    <div>
      {contacts.map((contact) => {
        return (
          <Contact key={contact} contact={contact} />
        )
      })}
    </div>
  )
}

export default ContactsList;