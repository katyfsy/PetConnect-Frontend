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
import {
  getUser,
  PSB_API_URL,
  getBearerToken,
} from '../UserProfile/psb-exports';
import { GrStatusPlaceholder } from 'react-icons/gr';

var stompClient = null;
const MessagingApp = () => {
  const { state } = useLocation();
  const privateChatsRef = useRef(new Map());
  const senderPhotoRef = useRef(
    'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png'
  );
  const receiverPhotoRef = useRef(
    'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png'
  );
  const newConversationReceiverName = useRef(state ? state.receiverName : '');

  const [userData, setUserData] = useState({
    username: getUser(),
    // check the state, if state !== null -> redirected from pet page
    receiverName: state ? state.receiverName : '',
    connected: false,
    message: '',
    senderPhoto: senderPhotoRef.current,
    receiverPhoto: receiverPhotoRef.current,
  });
  const [privateChats, setPrivateChats] = useState(privateChatsRef.current);
  const [currentContact, setCurrentContact] = useState('');
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    console.log('OUTSIDE');
    if (!privateChats.get(userData.receiverName)) {
      console.log('INSIDE');
      privateChatsRef.current.set(userData.receiverName, []);
      // setPrivateChats(new Map(privateChatsRef.current));
    }
  }, [state]);

  useEffect(() => {
    if (userData.username) {
      let Sock = new SockJS(
        'http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/ws'
      );
      // let Sock = new SockJS('http://localhost:8080/ws');
      stompClient = over(Sock);
      stompClient.connect({}, onConnected, onError);
      getAllChats(userData.username);
      getAllNotifications(userData.username);
      axios
        .get(`${PSB_API_URL}/api/public/user/${userData.username}`)
        .then((response) => {
          if (response.data.userPhoto !== null) {
            senderPhotoRef.current = response.data.userPhoto;
            setUserData({ ...userData, senderPhoto: senderPhotoRef.current });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData.username]);

  useEffect(() => {
    // remove the if once we retrieve from localhost (signup enabled)
    if (currentContact) {
      axios
        .get(`${PSB_API_URL}/api/public/user/${currentContact}`)
        .then((response) => {
          if (response.data.userPhoto !== null) {
            receiverPhotoRef.current = response.data.userPhoto;
            setUserData({
              ...userData,
              receiverPhoto: receiverPhotoRef.current,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentContact]);

  useEffect(() => {
    // remove the if once we retrieve from localhost (signup enabled)
    if (newConversationReceiverName.current) {
      axios
        .get(
          `${PSB_API_URL}/api/public/user/${newConversationReceiverName.current}`
        )
        .then((response) => {
          if (response.data.userPhoto !== null) {
            receiverPhotoRef.current = response.data.userPhoto;
            setUserData({
              ...userData,
              receiverPhoto: receiverPhotoRef.current,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
        receiverName: currentContact ? currentContact : userData.receiverName,
        message: userData.message,
        timestamp: Date().toString(),
        status: 'MESSAGE',
        senderPhoto: senderPhotoRef.current,
        receiverPhoto: receiverPhotoRef.current,
      };
      if (!privateChatsRef.current.get(chatMessage.receiverName)) {
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
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div style={{ fontFamily: '"Nunito", "sans-serif"' }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>
          Receiver:
          <input
            id='receiver-name'
            name='receiverName'
            placeholder='Enter the receiver name'
            value={currentContact ? currentContact : userData.receiverName}
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
                receiverName={
                  currentContact === '' ? userData.receiverName : currentContact
                }
              />
              {currentContact ? (
                <InputBar
                  setUserData={setUserData}
                  userData={userData}
                  handleSend={handleSend}
                  handleMessage={handleMessage}
                  currentContact={currentContact}
                />
              ) : (
                userData.receiverName && (
                  <InputBar
                    setUserData={setUserData}
                    userData={userData}
                    handleSend={handleSend}
                    handleMessage={handleMessage}
                    currentContact={currentContact}
                  />
                )
              )}
              {/* {userData.receiverName && (
                <InputBar
                  setUserData={setUserData}
                  userData={userData}
                  handleSend={handleSend}
                  handleMessage={handleMessage}
                  currentContact={currentContact}
                />
              )} */}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessagingApp;
