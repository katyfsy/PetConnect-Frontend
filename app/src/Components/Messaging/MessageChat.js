import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import './css/MessageChat.css';

const MessageChat = ({ privateChats, currentContact, username }) => {
  // need to add conditional to check if message is from user or contact to change alignment of message
  //  <li className={`message ${message.senderName === username && "self"}`} key={index}>
  // {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
  // <div className="message-data">{message.message}</div>
  // {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
  // </li>

  let date = '';

  const formatDayMonth = (string) => {
    var options = { hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleDateString(navigator.language, {});
    // return new Date(string).toLocaleDateString('en-US',options);
  };

  const formatDate = (string) => {
    var options = { hour: 'numeric', minute: 'numeric' };
    return new Date(string).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    // return new Date(string).toLocaleDateString('en-US',options);
  };

  return (
    <Container>
      {currentContact === '' ? (
        <div>Click on contact to view messages.</div>
      ) : (
        <div className='chat-content'>
          <div className='chat-messages'>
            {privateChats &&
              [...privateChats.get(currentContact)].map((message, index) => {
                return (
                  <div
                    className={`message ${
                      message.senderName === username && 'self'
                    }`}
                    key={index}
                  >
                    <div>
                      {formatDayMonth(message.timestamp).toString() === date.toString() ? null :
                        date = formatDayMonth(message.timestamp)
                    }</div>
                    {message.senderName !== username && (
                      <div className='avatar'>
                        <img
                          className='rounded-circle'
                          src={message.senderPhoto}
                          alt=''
                        />
                        {/* // {message.senderPhoto} */}
                      </div>
                    )}
                    <div className='message-data'>{message.message}</div>
                    {message.senderName === username && (
                      <div className='avatar self'>
                        <img
                          className='rounded-circle'
                          src={message.senderPhoto}
                          alt=''
                        />
                        {/* {message.senderPhoto} */}
                      </div>
                    )}
                    <div className='message-time'>
                      {formatDate(message.timestamp)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Container>
  );
};

export default MessageChat;
