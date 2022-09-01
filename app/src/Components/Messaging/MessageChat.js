import React, {useState, useEffect} from 'react';
import InputBar from './InputBar';
import stompClient from './MessagingApp';

const MessageChat = ({privateChats}) => {

  return (
    <>
    <div>Message Chat Box</div>
    {privateChats.size === 0 ? <div>Click a contact</div> : [...privateChats.keys()].map((contact, index) => {
      return (
        privateChats.get(contact).map((message) => {
          return (
            <li key={index} >
              {message.message}
            </li>
          )
        })
      )
    })}
    </>
  )
}

export default MessageChat;