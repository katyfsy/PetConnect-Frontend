import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import User from "../Components/UserProfile/User";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import './ResetPassword.css';
import { EMAIL_JS } from '../Components/UserProfile/DummyData';

const ResetPassword = () => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    doGetUser();
  };

  const resetAlert = () => {
    Swal.fire({
      text: 'If username exist, you will receive a Email soon.',
    })
  }

  const doGetUser = () => {
    axios.get(`${PSB_API_URL}/api/public/user/${username}`).then((res) => {
        //build the reset URL route
          // sendEmail(`http://localhost:3000/user/reset/${btoa(username + " " + process.env.REACT_APP_SECRET_KEY)}`, res.data.email);
          sendEmail(`http://a05c559e9f4dd47e6a449abdb704ff66-132472868.us-west-2.elb.amazonaws.com/user/reset/${btoa(username + " " + EMAIL_JS.REACT_APP_SECRET_KEY)}`, res.data.email);
          resetAlert();
    }).catch((error) => console.log(error))
  };

  const sendEmail = (resetUrl, email) => {
    const templateParams = {
      resetUrl: resetUrl,
      email: email,
    };
    emailjs
      .send(
        // process.env.REACT_APP_SERVICE_ID,
        // process.env.REACT_APP_TEMPLATE_ID,
        // templateParams,
        // process.env.REACT_APP_USER_ID
        EMAIL_JS.REACT_APP_SERVICE_ID,
        EMAIL_JS.REACT_APP_TEMPLATE_ID,
        // 'template_cuioiov',
        // 'service_r0k2eyh',
        templateParams,
        EMAIL_JS.REACT_APP_USER_ID
        // 'KowJ5SR4XG510Yyyk'

      )
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
      <div className="flex-wrapper-reset-page">
        <Row style={{paddingBottom: 50}}>
          <h1 style={{paddingBottom: 15}}>Trouble Logging In?</h1>
          <div className="Auth-form-container">
          <Form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
            <div className="text-center">Enter your username and we'll send you a link to get back into your account.</div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g psb"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button id="reset-password-button" type="submit">
                  Submit
                </Button>
              </div>
              <div className="text-center mt-3">
                Back to <Link style={{color: "#8F9ED9"}} to="/login">Login</Link>
              </div>
            </div>
          </Form>
          </div>
        </Row >
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default ResetPassword;
