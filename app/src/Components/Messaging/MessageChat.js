import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MessageChat.css';

const MessageChat = ({ privateChats, currentContact, username }) => {
// need to add conditional to check if message is from user or contact to change alignment of message
//  <li className={`message ${message.senderName === username && "self"}`} key={index}>
// {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
// <div className="message-data">{message.message}</div>
// {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
// </li>

  return (
    <Container>
      <div style={{ "font-weight": "bold" }}>Messages</div>
      {currentContact === "" ?
        <div>Click on contact to view messages.</div> :
        <div className='chat-content'>
          <ul className='chat-messages'>
            {privateChats && [...privateChats.get(currentContact)].map((message, index) => {
              return (
                <li className={`message ${message.senderName === username && "self"}`} key={index}>
                {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
                <div className="message-data">{message.message}</div>
                {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
                </li>
              )
            })}
          </ul>
        </div>
      }
    </Container>
  )
}

export default MessageChat;