import React, {useState} from 'react';
import InputBar from './InputBar';

// This will hold the convo between you and contact and input bar
const MessageChat = () => {

  const [privateChats, setPrivateChats] = useState(new Map());

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

  return (
    <>
    <div>Message Chat Box</div>
    <InputBar />
    </>
  )
}

export default MessageChat;