// state to keep track of message being typed
import React, {useState} from 'react';

const InputBar = ({handleSend, handleMessage}) => {

  return (
    <div>
    <div>Input Bar</div>
    <input type='text' className='input-message' name='message' placeholder={`Enter message`}
                  onChange={(event) => handleMessage(event)}/>
                <button type='button' className='send-button' onClick={(event) => {handleSend()}}>send</button>
    </div>
  )
}

export default InputBar;