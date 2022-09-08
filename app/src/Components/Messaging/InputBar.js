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
      <form onSubmit={(event) => { handleSend(event) }}>
        <input value={message} type='text' className='input-message' placeholder={`Enter message`}
          onChange={(event) => handleMessage(event)} />
          <BsEmojiSmileFill style={{ color: '#f5b942' }} onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          <button type='submit' className='send-button'>Send</button>
      </form>
    </div >
  )
}

export default InputBar;