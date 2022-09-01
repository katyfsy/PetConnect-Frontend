import React, {useState, useEffect} from 'react';
import InputBar from './InputBar';
import stompClient from './MessagingApp';

// let chatMessage = {
//   senderName: "Ivy",
//   receiverName: "Ginwoo",
//   message: "Test Message",
//   status: 'MESSAGE'
// };

// let data = new Map();
// data.set("Ginwoo", [chatMessage]);

// This will hold the convo between you and contact, input bar
const MessageChat = ({privateChats}) => {

  // // Need user name, receiver name, message to send message
  // const [userData, setUserData] = useState({
  //   username: "Test",
  //   receiverName:"Ginwoo",
  //   message: ""
  // })

  // const [message, setMessage] = useState("");

  // const [privateChats, setPrivateChats] = useState(new Map(data));

  // useEffect(() => {
  //   sendPrivateMessage();
  // }, [userData.message]); // Only re-run the effect if count changes

  // const onPrivateMessageReceived = (payload) => {
  //   let payloadData = JSON.parse(payload.body);
  //   if (privateChats.get(payloadData.senderName)) {
  //     privateChats.get(payloadData.senderName).push(payloadData);
  //     setPrivateChats(new Map(privateChats));
  //   } else {
  //     let list = [];
  //     list.push(payloadData);
  //     privateChats.set(payloadData.senderName, list);
  //     setPrivateChats(new Map(privateChats));
  //   }
  // }

  // const handleMessage = (event) => {
  //   event.preventDefault();
  //   const value = event.target.value;
  //   setMessage(value);
  //   console.log(value);
  // }

  // const handleSendButton = (event) => {
  //   event.preventDefault();
  //   handleSend(message);
  //   setMessage("");
  // }

  // const handleSend = (message) => {
  //   setUserData({...userData, "message": message});
  //   sendPrivateMessage();
  // }

  // const sendPrivateMessage = () => {
  //   if (stompClient) {
  //     // mock data
  //     let chatMessage = {
  //       senderName: userData.username, // current user's name
  //       receiverName: "Ginwoo", // receiver's name
  //       message: userData.message,
  //       status: 'MESSAGE'
  //     };
  //     privateChats.get(chatMessage.receiverName).push(chatMessage);
  //     setPrivateChats(new Map(privateChats));
  //     console.log(stompClient)
  //     stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
  //     console.log("attempted to send a message")
  //     // set message input back to empty
  //   }
  // }

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
    {/* <InputBar handleMessage={handleMessage} handleSendButton={handleSendButton} /> */}
    </>
  )
}

export default MessageChat;