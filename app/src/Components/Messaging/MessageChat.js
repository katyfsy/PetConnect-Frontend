import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Container from 'react-bootstrap/Container';
import './css/MessageChat.css';

const MessageChat = ({ privateChats, currentContact, username }) => {
  // need to add conditional to check if message is from user or contact to change alignment of message
  //  <li className={`message ${message.senderName === username && "self"}`} key={index}>
  // {message.senderName !== username && <div className="avatar">{message.senderName}</div>}
  // <div className="message-data">{message.message}</div>
  // {message.senderName === username && <div className="avatar self">{message.senderName}</div>}
  // </li>

  const [search, setSearch] = useState('');
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
    setSearch(value);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.length > 0) {
      filterMessages(search);
    } else {
      setFilteredMessages(new Map());
    }
  };

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
      <SearchBar privateChats={privateChats} handleSearchInput={handleSearchInput} handleSearch={handleSearch}/>
      {currentContact === '' ? (
        <div>Click on contact to view messages.</div>
      ) : (
        <div className='chat-content'>
          <ul>
            {chats &&
              [...chats.get(currentContact)].map((message, index) => {
                return (
                  <div>
                  <div>
                  {formatDayMonth(message.timestamp).toString() === date.toString() ? null :
                    date = formatDayMonth(message.timestamp)
                }</div>
                  <li
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
                  </li>
                  </div>
                );
              })}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default MessageChat;
