import React, {useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import MessageChat from './MessageChat';
import ContactsList from './ContactsList';
import InputBar from './InputBar';

// triggers everything on click on message button
// send initial get request to server to retreive contacts
// at connection, change your status to active
// subscribe to your own channel to accept
// at close, change your status to inactive

var stompClient = null;
const MessagingApp = () => {

  const [userData, setUserData] = useState({
    username: "",
    receiverName: "",
    connected: false,
    message: ""
  })

  const [privateChats, setPrivateChats] = useState(new Map());

  // current contact state
  const [currentContact, setCurrentContact] = useState("");

  const onLanding = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    // get request for all contacts for this user
    // pass down to contacts list
  }

  const onConnected = () => {
    setUserData({...userData, "connected": true});
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
  }

  const handleName = (event) => {
    const {value, name} = event.target;
    setUserData({...userData, [name]: value});
  }

  const handleMessage = (event) => {
    const value = event.target.value;
    setUserData({...userData, "message": value});
  }

  const handleSend = () => {
    sendPrivateMessage();
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

  const sendPrivateMessage = () => {
    if (stompClient) {
      // mock data
      let chatMessage = {
        senderName: userData.username, // current user's name
        receiverName: userData.receiverName, // receiver's name
        message: userData.message,
        status: 'MESSAGE'
      };
      if (!privateChats.get(chatMessage.receiverName)) {
        privateChats.set(chatMessage.receiverName, []);
      }
      privateChats.get(chatMessage.receiverName).push(chatMessage);
      setPrivateChats(new Map(privateChats));
      console.log(stompClient)
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      console.log("attempted to send a message");
      setUserData({...userData, "message": ""});
    }
    console.log(Array.from(privateChats));
  }

  const onError = (err) => {
    console.log(err);
  }

  return(
    <>
      <div>Hello World</div>
      <input
          id = 'user-name'
          name='username'
          placeholder = 'Enter the user name'
          value = {userData.username}
          onChange = {handleName}
          />
      <button onClick={onLanding}>Connect</button>
      <input
          id = 'receiver-name'
          name='receiverName'
          placeholder = 'Enter the receiver name'
          value = {userData.receiverName}
          onChange = {handleName}
      />
      <button onClick={onLanding}>Connect</button>
      <ContactsList privateChats={privateChats} setCurrentContact={setCurrentContact}/>
      <MessageChat privateChats={privateChats} currentContact={currentContact}/>
      <InputBar handleSend={handleSend} handleMessage={handleMessage}/>
    </>
  )
}

export default MessagingApp;
