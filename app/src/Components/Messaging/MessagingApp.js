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
import './MessageChat.css';
import { useLocation } from 'react-router-dom';

var stompClient = null;

const MessagingApp = () => {
  const { state } = useLocation();
  let { receiverName } = state;
  const [userData, setUserData] = useState({
    username: '',
    // username: localStorage.getItem("username"),
    receiverName: receiverName || '',
    connected: false,
    message: "",
    senderPhoto: "",
    receiverPhoto: ""
  })

  const privateChatsRef = useRef(new Map());
  const [privateChats, setPrivateChats] = useState(privateChatsRef.current);

  const [currentContact, setCurrentContact] = useState('');

  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/public/user/${userData.username}`
      )
      .then((response) => {
        if (response.data.userPhoto === null) {
          setUserData({ ...userData, senderPhoto: 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png' });
        } else {
          setUserData({ ...userData, senderPhoto: response.data.userPhoto });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.username])

  useEffect(() => {
    axios
      .get(
        `http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/public/user/${userData.receiverName}`
      )
      .then((response) => {
        if (response.data.userPhoto === null) {
          setUserData({ ...userData, receiverPhoto: 'https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png' });
        } else {
          setUserData({ ...userData, receiverPhoto: response.data.userPhoto });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.receiverName])

  const onLanding = (event) => {
    event.preventDefault();
    let Sock = new SockJS('http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/ws');
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

  const getPhotos = (name) => {
    axios
      .get(
        `http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/public/user/${name}`
      )
      .then((response) => {
        let usernameList = privateChatsRef.current.keys();

        for (let i = 0; i < usernameList.length; i++) {
          // check the usernames in our contact list against the response.data
          // if so
            // set the privateChats
        }


        setPrivateChats(new Map(Object.entries(response.data)));
        privateChatsRef.current = new Map(Object.entries(response.data));
        console.log('privateChatsRef:, ', privateChatsRef.current)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getAllChats = (username) => {
    axios
      .get(
        `http://afea8400d7ecf47fcb153e7c3e44841d-1281436172.us-west-2.elb.amazonaws.com/messages/${username}`
      )
      // axios.get(`http://localhost:8080/messages/${username}`)
      .then((response) => {
        setPrivateChats(new Map(Object.entries(response.data)));
        privateChatsRef.current = new Map(Object.entries(response.data));
        console.log('privateChatsRef:, ', privateChatsRef.current)
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
  const onPrivateMessageReceived = async (payload) => {

    // getAllChats(userData.username);
    getAllNotifications(userData.username);
    let payloadData = JSON.parse(payload.body);
    let conversation = privateChatsRef.current;
    console.log('REF: ', conversation)
    // console.log('senderName:', payloadData['senderName'])
    if (privateChatsRef.current.get(payloadData.senderName)) {
      console.log(
        'from if statement: ',
        privateChatsRef.current.get(payloadData.senderName)
      );
      privateChatsRef.current.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChatsRef.current));
    } else {
      console.log(
        'from else statement: ',
        privateChats.get(payloadData.senderName)
      );
      let list = [];
      list.push(payloadData);
      privateChatsRef.current.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChatsRef.current));
    }
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
        receiverPhoto: userData.receiverPhoto
      };
      console.log("from sendPrivateMessage: ", !privateChats.get(chatMessage.receiverName))
      if (!privateChats.get(chatMessage.receiverName)) {
        privateChats.set(chatMessage.receiverName, []);
      }
      privateChats.get(chatMessage.receiverName).push(chatMessage);
      console.log('before setting: ', privateChats);
      setPrivateChats(new Map(privateChats));
      console.log('after setting: ', privateChats);
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, 'message': '' });
    }
  };

  const onError = (err) => {
    console.log(err);
  };

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
  );
};

export default MessagingApp;
