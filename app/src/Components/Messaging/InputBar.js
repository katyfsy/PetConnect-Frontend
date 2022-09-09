import React, { useState } from 'react';
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import './InputBar.css';
import Modal from 'react-bootstrap/Modal';

const InputBar = ({ handleSend, handleMessage, setUserData, userData, currentContact }) => {
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
    {currentContact &&
      <div className='input-bar'>
        <form onSubmit={(event) => { handleSend(event) }}>
          <input value={message} type='text' className='input-message' placeholder={`Enter message`}
            onChange={(event) => handleMessage(event)} />
            <BsEmojiSmileFill style={{ color: '#f5b942' }} onClick={handleEmojiPickerhideShow} />
            {showEmojiPicker &&
              <Modal show={showEmojiPicker} onHide={handleEmojiPickerhideShow}>
                <Modal.Body>
                  <Picker onEmojiClick={handleEmojiClick} />
                </Modal.Body>
              </Modal>
            }
            <button type='submit' className='input-button'>Send</button>
        </form>
      </div >
    }
    </div>
  )
}

export default InputBar;