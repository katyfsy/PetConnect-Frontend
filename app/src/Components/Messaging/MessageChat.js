import React, { useState } from 'react';

const MessageChat = ({ privateChats, currentContact }) => {
  return (
    <>
      <div style={{ 'font-weight': 'bold' }}>Message Chat Box</div>
      {currentContact === '' ? (
        <div>Click on contact to view messages.</div>
      ) : (
        <div>
          {/* {console.log('privateChats updated:', [...privateChats])} */}
          {privateChats &&
            [...privateChats.get(currentContact)].map((message, index) => {
              return <li key={index}>{message.message}</li>;
            })}
        </div>
      )}
    </>
  );
};

export default MessageChat;
