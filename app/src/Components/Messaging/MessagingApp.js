import React, {useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

// triggers everything on click on message button
// send initial get request to server to retreive contacts
// at connection, change your status to active
// subscribe to your own channel to accept
// at close, change your status to inactive

const MessagingApp = () => {
  return(<div>Hello World</div>)
}

export default MessagingApp;