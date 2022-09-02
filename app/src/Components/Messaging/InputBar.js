// state to keep track of message being typed
import React, {useState} from 'react';

const InputBar = ({handleSend, handleMessage, message}) => {

  return (
    <div>
    <div>Input Bar</div>
    <input value={message} type='text' className='input-message' placeholder={`Enter message`}
                  onChange={(event) => handleMessage(event)}/>
                <button type='button' className='send-button' onClick={(event) => {handleSend()}}>Send</button>
    </div>
  )
}

export default InputBar;