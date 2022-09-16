import './Profile.css';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import { Container,Button, Row, Col, Image } from 'react-bootstrap';
import Reviews from '../Components/UserProfile/Reviews';
import { getBearerToken, getUser, PSB_API_URL } from "../Components/UserProfile/psb-exports";
import Swal from 'sweetalert2';

function Profile() {
  const [form, setForm] = useState({
    username:'',
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    userType: 'ORGANIZATION',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    userPhoto: ''
  });

  const params = useParams();

  useEffect(() => {
    const doGetUser = () => {
      axios.get(`${PSB_API_URL}/api/public/users/orgs/${params.username}`,
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
  }, [params.username]);

  const loginAlert = () => {
    Swal.fire({
      title: 'ERROR',
      text: 'Please login first to chat with the user.',
    })
  }

  const renderEditOrMessageButton = () => {
    if(getUser() === "" || getUser() === null) {
      return <Button style={{backgroundColor: "#F4976C", borderColor: "#F4976C"}} size="lg" onClick={() => loginAlert()}>
               Message me
             </Button>;
    } else {
      return <Button style={{backgroundColor: "#F4976C", borderColor: "#F4976C"}} size="lg" href="/messages">Message me</Button>
    }
  }

  if(form.userType === "USER") {
    return (
      <div className="profilePage">
        {/* <Container> */}
          <Header/>
        {/* </Container> */}
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
        </Container>
      </div>
    )
  } else {
    return (
      <div className="profilePage">
        {/* <Container> */}
          <Header/>
        {/* </Container> */}
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
              <Reviews orgUsername={params.username}/>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Profile;