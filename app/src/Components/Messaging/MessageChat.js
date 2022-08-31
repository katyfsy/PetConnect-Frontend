import React, {useState} from 'react';
import InputBar from './InputBar';
import stompClient from './MessagingApp';

let chatMessage = {
  senderName: "Ivy",
  receiverName: "Ginwoo",
  message: "Test Message",
  status: 'MESSAGE'
};

let data = new Map();
data.set("Ginwoo", [chatMessage]);

// This will hold the convo between you and contact, input bar
const MessageChat = () => {

  // Need user name, receiver name, message to send message
  const [userData, setUserData] = useState({
    username: "Test",
    receiverName:"Ginwoo",
    message: ""
  })

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

  const sendPrivateMessage = (message) => {
    console.log(message)
    setUserData({...userData, "message": message});
    console.log(userData.message)
    if (stompClient) {
      // mock data
      let chatMessage = {
        senderName: userData.username, // current user's name
        receiverName: userData.receiverName, // receiver's name
        message: userData.message,
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
    <button onClick={sendPrivateMessage}>Send Message</button>
    {privateChats.get("Ginwoo").map((message, index) => {
      return (
        <li key={index} >
          {message.message}
        </li>
      )
    })}
    <InputBar sendPrivateMessage={sendPrivateMessage} />
    </>
  )
}

export default MessageChat;