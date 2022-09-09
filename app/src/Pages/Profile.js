import './Profile.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import { Container,Button, Row, Col, Image } from 'react-bootstrap';
import Reviews from '../Components/UserProfile/Reviews';
// import getUser from '../Components/UserProfile/DummyData';
import { getBearerToken, getUser } from "../Components/UserProfile/userInfo.js";

function Profile() {
  const [form, setForm] = useState({
    username:'',
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    userType: 'individual',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    userPhoto: ''
  });

  // function getToken() {
  //   const tokenString = localStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   return userToken;
  // }

  // function getUsername() {
  //   const username = localStorage.getItem('username');
  //   return username;
  // }

  useEffect(() => {
    // local data fetch for development
    // const doGetUser = async () => {
    //   const result = await getUser();
    //   setForm(result);
    // }
    const doGetUser = () => {
      axios.get(`http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/user/${localStorage.getItem('username')}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
        .then((res) => {
          let result = res.data;
          for(var key in result) {
            if(result[key] === null) {
              result[key] = "";
            }
            if(result.userPhoto === "") {
              result.userPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
          }
          setForm(result);
        });
      }
    doGetUser();
  }, []);

  const renderEditOrMessageButton = () => {
    if(getUser() === "" || getUser() === null) {
      return <Button variant="primary" size="lg" href="/login" onClick={() => alert("Please login first to chat with the user.")}>
               Message me
             </Button>;
    } else if(getUser() === form.username) {
      return <Button variant="primary" size="lg" href="/profile/edit">Edit</Button>
    } else {
      return <Button variant="primary" size="lg" href="/">Message me</Button>
    }
  }

  if(form.userType === "USER") {
    return (
      <div>
        <Container>
          <Header/>
        </Container>
        <Navigationbar/>
        <Container>
          <Row className="mb-3">
            <Col>
              <Image src={form.userPhoto} roundedCircle className="profile-photo"/>
              <div>
                {renderEditOrMessageButton()}
              </div>
            </Col>
            <Col>
              <Row className="mb-3" id="user-name">
                <h1 className="user-name">{form.firstName}{' '}{form.lastName}</h1>
              </Row>
              <Row className="mb-3" id="user-email">
                <h3>Email:</h3>
                <p className="user-email">{form.email}</p>
              </Row>
              <Row className="mb-3" id="user-description">
                <h3 className="user-description">Description:</h3>
              </Row>
              <Row className="mb-3">
                <p className="text-start">{form.description}</p>
              </Row>
            </Col>
          </Row>
          <hr className="mt-5 mb-3"/>
          <Row>
            <Reviews />
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div>
        <Container>
          <Header/>
        </Container>
        <Navigationbar/>
        <Container>
          <Row className="mb-3">
            <Col>
              <Image src={form.userPhoto} roundedCircle className="profile-photo"/>
              <div>
                {renderEditOrMessageButton()}
              </div>
            </Col>
            <Col>
              <Row className="mb-3" id="user-name">
                <h1 className="user-name">{form.businessName}</h1>
              </Row>
              <Row className="mb-3" id="user-email">
                <Col>
                  <h4>Email:</h4>
                  <p className="user-email">{form.email}</p>
                </Col>
                <Col>
                  <h4>Phone:</h4>
                  <p className="user-email">{form.phone}</p>
                </Col>
              </Row>
              <Row className="mb-3" id="user-address">
                <h4 className="user-address">Address:</h4>
                <p className="user-address">{form.address}</p>
              </Row>
              <Row className="mb-3" id="user-address">
                <Col>
                  <h4 className="user-address">City</h4>
                  <p className="user-address">{form.city}</p>
                </Col>
                <Col>
                  <h4 className="user-address">State</h4>
                  <p className="user-address">{form.state}</p>
                </Col>
                <Col>
                  <h4 className="user-address">Zip Code</h4>
                  <p className="user-address">{form.zipCode}</p>
                </Col>
              </Row>
              <Row className="mb-3" id="user-link">
                <h4 className="user-link"><a href="https://www.w3schools.com/">Visit Our Website!</a></h4>
              </Row>
              <Row className="mb-3" id="user-description">
                <h4 className="user-description">Description:</h4>
              </Row>
              <Row className="mb-3">
                <p className="text-start">{form.description}</p>
              </Row>
            </Col>
          </Row>
          <Row>
              <Reviews />
          </Row>
        </Container>
      </div>
    )
  }
}

export default Profile;