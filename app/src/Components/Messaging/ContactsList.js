import React, {useState} from 'react';

const ContactsList = () => {
  // will have list of contacts list
  // on click, send get request to server for conversation between you and this contact
  // also change a state to change the view of the MessagesBox to show the past messages
  const [contacts, setContacts] = useState()
  return (
    <div>
      {/* {[...privateChats.keys()].map((name, index) => (
                <li onClick={() => {setTab(name)}} className={`member ${tab === name && "active"}`} key={index}>
                  {name}
                </li>
              ))} */}
    </div>
  )
}

export default ContactsList;