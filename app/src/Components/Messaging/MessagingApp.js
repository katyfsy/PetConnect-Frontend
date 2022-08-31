import React, {useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

// triggers everything on click on message button
// send initial get request to server to retreive contacts
// at connection, change your status to active
// subscribe to your own channel to accept
// at close, change your status to inactive

// message contains sender name, id, receiver name, id, message, status

var stompClient = null;
const MessagingApp = () => {

  const [userData, setUserData] = useState({
    username: "Test",
    receivername:"",
    connected: false,
    message: ""
  })
  const [privateChats, setPrivateChats] = useState(new Map());

  const onLanding = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    // get request for all contacts for this user
  }

  const onConnected = () => {
    setUserData({...userData, "connected": true});
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
  }

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  }

  const onError = (err) => {
    console.log(err);
  }

  return(
    <>
      <div>Hello World</div>
      <button onClick={onLanding}></button>
    </>
  )
}

export default MessagingApp;