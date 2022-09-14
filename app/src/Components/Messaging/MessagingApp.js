import React, { useState, useEffect, useRef } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import MessageChat from './MessageChat';
import ContactsList from './ContactsList';
import InputBar from './InputBar';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import audio from './static/bark.wav';

var stompClient = null;

const MessagingApp = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState({
    // uncomment once the signup is open up
    // username: localStorage.getItem('username'),
    username: '',
    // check the state, if state !== null -> redirected from pet page
    receiverName: state ? state.receiverName : '',
    connected: false,
    message: '',
    senderPhoto: 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png',
    receiverPhoto: 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png',
  });

  const privateChatsRef = useRef(new Map());
  const [privateChats, setPrivateChats] = useState(privateChatsRef.current);

  const [currentContact, setCurrentContact] = useState('');

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    // remove the if once we retrieve from localhost (signup enabled)
    if (userData.username) {
      axios
        .get(
          `http://a6740867e357340d391ac68d12435ca6-2060668428.us-west-2.elb.amazonaws.com/api/public/user/${userData.username}`
        )
        .then((response) => {
          setUserData({ ...userData, senderPhoto: response.data.userPhoto });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.username]);

  useEffect(() => {
    // remove the if once we retrieve from localhost (signup enabled)
    if (userData.receiverName) {
      axios
        .get(
          `http://a6740867e357340d391ac68d12435ca6-2060668428.us-west-2.elb.amazonaws.com/api/public/user/${userData.receiverName}`
        )
        .then((response) => {
          setUserData({
            ...userData,
            receiverPhoto: response.data.userPhoto,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.receiverName]);

  const onLanding = (event) => {
    event.preventDefault();
    let Sock = new SockJS(
      'http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/ws'
    );
    // let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    getAllChats(userData.username);
    getAllNotifications(userData.username);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      '/user/' + userData.username + '/private',
      onPrivateMessageReceived
    );
  };

  const getAllChats = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/${username}`
      )
      // axios.get(`http://localhost:8080/messages/${username}`)
      .then((response) => {
        setPrivateChats(new Map(Object.entries(response.data)));
        privateChatsRef.current = new Map(Object.entries(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllNotifications = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/notifications/${username}`
      )
      // axios.get(`http://localhost:8080/messages/notifications/${username}`)
      .then((response) => {
        setNotificationList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleName = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleMessage = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setUserData({ ...userData, message: value });
  };

  const handleSend = (event) => {
    event.preventDefault();
    sendPrivateMessage();
  };

  // notification if a message is received
  const onPrivateMessageReceived = (payload) => {
    // getAllChats(userData.username);
    getAllNotifications(userData.username);
    let payloadData = JSON.parse(payload.body);

    if (privateChatsRef.current.get(payloadData.senderName)) {
      privateChatsRef.current.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChatsRef.current));
    } else {
      let list = [];
      list.push(payloadData);
      privateChatsRef.current.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChatsRef.current));
    }
    playAudio();
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: userData.receiverName
          ? userData.receiverName
          : currentContact,
        message: userData.message,
        status: 'MESSAGE',
        senderPhoto: userData.senderPhoto,
        receiverPhoto: userData.receiverPhoto,
      };

      if (!privateChats.get(chatMessage.receiverName)) {
        privateChatsRef.current.set(chatMessage.receiverName, []);
      }
      privateChatsRef.current.get(chatMessage.receiverName).push(chatMessage);
      setPrivateChats(new Map(privateChatsRef.current));
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const playAudio = () => {
    new Audio(audio).play();
  }

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div style={{ fontFamily: '"Nunito", "sans-serif"' }}>
      <div>
        <span style={{ 'fontWeight': 'bold' }}>
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
        <span style={{ 'fontWeight': 'bold' }}>
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

      <Container>
        <Row>
          <Col sm={4}>
            <ContactsList
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
              <MessageChat
                privateChats={privateChats}
                currentContact={currentContact}
                username={userData.username}
              />
              <InputBar
                setUserData={setUserData}
                userData={userData}
                handleSend={handleSend}
                handleMessage={handleMessage}
                currentContact={currentContact}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagingApp;
