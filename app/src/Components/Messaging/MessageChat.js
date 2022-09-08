import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MessageChat = ({ privateChats, currentContact, username }) => {
// need to add conditional to check if message is from user or contact to change alignment of message
{/* <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
{message.senderName !== username && <div className="avatar">{message.senderName}</div>}
<div className="message-data">{message.message}</div>
{message.senderName === username && <div className="avatar self">{message.senderName}</div>}
</li> */}

  return (
    <>
      <div style={{ "font-weight": "bold" }}>Messages</div>
      {currentContact === "" ?
        <div>Click on contact to view messages.</div> :
        <div>
          {privateChats && [...privateChats.get(currentContact)].map((message, index) => {
            return (
              <Card bg='light' border='primary' key={index} >
                {username === message.senderName &&
                <div style={{display:'flex', padding: '0 1em', justifyContent:'right'}}>
                  <div>{message.message}</div>
                  <div style={{padding: '0 10px'}}>{message.senderName}</div>
                </div>}
                {username !== message.senderName &&
                <div style={{display:'flex', padding: '0 1em', justifyContent:'left'}}>
                  <div style={{padding: '0 10px'}}>{message.senderName}</div>
                  <div>{message.message}</div>
                </div>}
              </Card>
            )
          })}
        </div>
      }
    </>
  )
}

export default MessageChat;