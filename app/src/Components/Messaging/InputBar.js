import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import './css/InputBar.css';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';

const InputBar = ({
  handleSend,
  handleMessage,
  setUserData,
  userData,
  currentContact,
}) => {
  let { message } = userData;

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let updatedMsg = message;
    updatedMsg += emojiObject.emoji;
    setUserData({ ...userData, message: updatedMsg });
  };

  return (
    <div>
      <div className='input-bar'>
        <form
          className='input-bar-elements'
          onSubmit={(event) => {
            handleSend(event);
          }}
        >
          <TextField
            hiddenLabel
            fullWidth
            id='standard-basic'
            label=''
            variant='standard'
            value={message}
            type='text'
            className='input-message'
            placeholder={`Enter message`}
            onChange={(event) => handleMessage(event)}
          />
          <BsEmojiSmileFill
            style={{ color: '#f5b942', marginTop: '6px', marginRight: '5px' }}
            onClick={handleEmojiPickerhideShow}
          />
          {showEmojiPicker && (
            <Modal show={showEmojiPicker} onHide={handleEmojiPickerhideShow}>
              <Modal.Body>
                <Picker onEmojiClick={handleEmojiClick} />
              </Modal.Body>
            </Modal>
          )}
          <button className='input-button' type='submit'>
            Send
          </button>
        </form>
      </div>
      {/* } */}
    </div>
  );
};

export default InputBar;
