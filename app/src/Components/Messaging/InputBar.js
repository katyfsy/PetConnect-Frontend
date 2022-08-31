// state to keep track of message being typed
import React, {useState} from 'react';

const InputBar = ({sendPrivateMessage}) => {

  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setMessage(value);
  }

  const handleSendButton = (event) => {
    event.preventDefault();
    sendPrivateMessage(message);
    setMessage("");
  }

  return (
    <div>
    <div>Input Bar</div>
    <input type='text' className='input-message' name='message' placeholder={`Enter message`} value={message}
                  onChange={handleMessage}/>
                <button type='button' className='send-button' onClick={(event) => {handleSendButton(event)}}>send</button>
    </div>
  )
}

export default InputBar;