import React, { useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import MessageChat from './MessageChat';
import ContactsList from './ContactsList';
import InputBar from './InputBar';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MessageChat.css';


var stompClient = null;

const MessagingApp = () => {

  const [userData, setUserData] = useState({
    username: "",
    // username: localStorage.getItem("username"),
    receiverName: "",
    connected: false,
    message: ""
  })


  const [privateChats, setPrivateChats] = useState(new Map());

  const [currentContact, setCurrentContact] = useState("");

  const [notificationList, setNotificationList] = useState([]);


  const onLanding = (event) => {
    event.preventDefault();
    let Sock = new SockJS('http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/ws');
    // let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    getAllChats(userData.username);
    getAllNotifications(userData.username)
  }



  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
  }

  const getAllChats = (username) => {
    axios.get(`http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/${username}`)
      // axios.get(`http://localhost:8080/messages/${username}`)
      .then((response) => {
        setPrivateChats(new Map(Object.entries(response.data)));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getAllNotifications = (username) => {
    axios.get(`http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${username}`)
      // axios.get(`http://localhost:8080/messages/notifications/${username}`)
      .then((response) => {
        setNotificationList(response.data);

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleName = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleMessage = (event) => {
    const value = event.target.value;
    setUserData({ ...userData, "message": value });
  }

  const handleSend = (event) => {
    event.preventDefault();
    sendPrivateMessage();
  }

  // notification if a message is received
  const onPrivateMessageReceived = (payload) => {
    getAllChats(userData.username);
    getAllNotifications(userData.username)
    let payloadData = JSON.parse(payload.body);
    // console.log('senderName:', payloadData['senderName'])
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  }

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: userData.receiverName ? userData.receiverName : currentContact,
        message: userData.message,
        status: 'MESSAGE'
      };

      if (!privateChats.get(chatMessage.receiverName)) {
        privateChats.set(chatMessage.receiverName, []);
      }
      privateChats.get(chatMessage.receiverName).push(chatMessage);
      setPrivateChats(new Map(privateChats));
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }

  const onError = (err) => {
    console.log(err);
  }

  return (
    <div style={{fontFamily: '"Nunito", "sans-serif"'}}>
          <div>
            <span style={{ 'font-weight': 'bold' }} className='spanSpacing'>
              Username:
              <input
                id='user-name'
                name='username'
                placeholder='Enter the user name'
                value={userData.username}
                onChange={handleName}
              />
              <button onClick={onLanding}>Connect</button>
            </span>
            <span style={{ 'font-weight': 'bold' }}>
              Receiver:
              <input
            id='receiver-name'
            name='receiverName'
            placeholder='Enter the receiver name'
            value={
              userData.receiverName ? userData.receiverName : currentContact
            }
            onChange={handleName}
          />
            </span>
          </div>
          <hr />
      {/* <div>
        <div style={{ "font-weight": "bold" }}>Messaging Page</div>
        <span>
        <div style={{ "font-weight": "bold" }}>Username</div>
        <form onSubmit={onLanding}>
        <input
          id='user-name'
          name='username'
          placeholder='Enter the user name'
          value={userData.username}
          onChange={handleName}
        />
        <button type='submit'>Connect</button>
        </form>
        </span>
        <span>
        <div style={{ "font-weight": "bold" }}>Receiver</div>
        <input
          id='receiver-name'
          name='receiverName'
          placeholder='Enter the receiver name'
          value={userData.receiverName ? userData.receiverName : currentContact}
          onChange={handleName}
        />
        </span>
        <hr />
      </div> */}
      <Container>
        <Row>
          <Col sm={4}>
            <ContactsList className='members-list'
              username={userData.username}
              privateChats={privateChats}
              setCurrentContact={setCurrentContact}
              setUserData={setUserData}
              notificationList={notificationList}
              setNotificationList={setNotificationList}
              currentContact={currentContact}
            />
          </Col>
          <Col sm={8}>
            <Container>
              <MessageChat privateChats={privateChats} currentContact={currentContact} username={userData.username} />
              <InputBar setUserData={setUserData} userData={userData} handleSend={handleSend} handleMessage={handleMessage} currentContact={currentContact}/>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MessagingApp;
