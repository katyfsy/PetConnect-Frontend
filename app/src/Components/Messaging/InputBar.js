import React, { useState } from 'react';
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

const InputBar = ({ handleSend, handleMessage, setUserData, userData }) => {
  let { message } = userData

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let updatedMsg = message;
    updatedMsg += emojiObject.emoji;
    setUserData({ ...userData, "message": updatedMsg });
  };

  return (
    <div>
      <div>Input Bar</div>
      <input value={message} type='text' className='input-message' placeholder={`Enter message`}
        onChange={(event) => handleMessage(event)} />
      <div>
        <BsEmojiSmileFill style={{ color: '#f5b942' }} onClick={handleEmojiPickerhideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        <button type='button' className='send-button' onClick={(event) => { handleSend() }}>Send</button>
      </div>

    </div >
  )
}

export default InputBar;