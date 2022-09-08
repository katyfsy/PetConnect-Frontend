import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const MessageChat = ({ privateChats, currentContact, username }) => {
// need to add conditional to check if message is from user or contact to change alignment of message

  // let alignment;
  // alightment = username === message.senderName ? 'left' : 'right';
  return (
    <>
      <div style={{ "font-weight": "bold" }}>Message Chat Box</div>
      {currentContact === "" ?
        <div>Click on contact to view messages.</div> :
        <div>
          {/* {console.log('privateChats updated:', [...privateChats])} */}
          {privateChats && [...privateChats.get(currentContact)].map((message, index) => {
            return (
              <Card border={'primary'} bg={'light'} key={index} >
                <Card.Header>
                  {username === message.senderName ? message.senderName : currentContact}
                </Card.Header>
                <Card.Text>
                {message.message}
                </Card.Text>
              </Card>
            )
          })}
        </div>
      }
    </>
  )
}

export default MessageChat;