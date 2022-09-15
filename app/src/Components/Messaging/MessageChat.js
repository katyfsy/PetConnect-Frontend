import React, { useState, useRef } from 'react';
import SearchBar from './SearchBar';
import Container from 'react-bootstrap/Container';
import './css/MessageChat.css';

const MessageChat = ({ privateChats, currentContact, username, receiverName}) => {
  // need to add conditional to check if message is from user or contact to change alignment of message
  //  <li className={`message ${message.senderName === username && "self"}`} key={index}>
  // {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
  // <div className="message-data">{message.message}</div>
  // {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
  // </li>

  const searchRef = useRef('');
  const [search, setSearch] = useState(searchRef.current);

  const [filteredMessages, setFilteredMessages] = useState(new Map());
  let date = '';
  let chats;

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

  const handleSearchInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    searchRef.current = value;
    setSearch(searchRef.current);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.length > 0) {
      filterMessages(searchRef.current);
    } else {
      setFilteredMessages(new Map());
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    searchRef.current = '';
    setSearch(searchRef.current);
    setFilteredMessages(new Map());
  }

  const filterMessages = () => {
    let searchedChats = new Map();
    if (privateChats) {
      let messages = [];
      [...privateChats.get(currentContact)].map((message, index) => {
        let content = (message.message).toLowerCase();
        if (content.includes(search.toLowerCase())) {
          messages.push(message);
        }
      })
      searchedChats.set(currentContact, messages);
      setFilteredMessages(new Map(searchedChats));
    }
  }

  if (filteredMessages.size === 0) {
    chats = privateChats;
  } else {
    chats = filteredMessages;
  }

  return (
    <Container>
      <SearchBar
        searchRef={searchRef.current}
        setSearch={setSearch}
        privateChats={privateChats}
        handleSearchInput={handleSearchInput}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      {currentContact === '' ? (
        <div>{receiverName}</div>
      ) : (
        <div className='chat-content'>
          <div className='chat-messages'>
            {chats &&
              [...chats.get(currentContact)].map((message, index) => {
                return (
                  <div className='chat-messages'>
                  {formatDayMonth(message.timestamp).toString() === date.toString() ? null :
                    (<div> <hr/> {date = formatDayMonth(message.timestamp)} </div>)
                }
                  <div
                    className={`message ${
                      message.senderName === username && 'self'
                    }`}
                    key={index}
                  >
                    {/* <div>
                      {formatDayMonth(message.timestamp).toString() === date.toString() ? null :
                        date = formatDayMonth(message.timestamp)
                    }</div> */}
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
