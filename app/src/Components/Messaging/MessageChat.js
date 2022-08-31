import React, {useState} from 'react';
import InputBar from './InputBar';
import stompClient from './MessagingApp';

let chatMessage = {
  senderName: "Ivy",
  senderId: 1,
  receiverName: "Ginwoo",
  receiverId: 2,
  message: "Test Message",
  status: 'MESSAGE'
};

let testMessage = {
  senderName: "Ivy",
  senderId: 1,
  receiverName: "Ginwoo",
  receiverId: 2,
  message: "Test Message number 2",
  status: 'MESSAGE'
};

let data = new Map();
data.set("Ginwoo", [chatMessage]);

// This will hold the convo between you and contact, input bar
const MessageChat = () => {

  const [privateChats, setPrivateChats] = useState(new Map(data));

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
        senderName: "Ivy", // current user's name
        senderId: 1, // current user's id
        receiverName: "Ginwoo", // receiver's name
        receiverId: 2, // receiver's id
        message: "Test message number 2!",
        status: 'MESSAGE'
      };
      privateChats.get(chatMessage.receiverName).push(chatMessage);
      setPrivateChats(new Map(privateChats));
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      // set message input back to empty
    }
  }

  return (
    <>
    <div>Message Chat Box</div>
    <button onClick={sendPrivateMessage}>Add Message</button>
    {privateChats.get("Ginwoo").map((message, index) => {
      return (
        <li key={index} >
          {message.message}
        </li>
      )
    })}
    <InputBar />
    </>
  )
}

export default MessageChat;