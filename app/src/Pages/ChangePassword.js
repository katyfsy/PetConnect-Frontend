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
import emailjs from "@emailjs/browser";
import { EMAIL_ID } from "../config.js";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [resetUrl, setResetUrl] = useState("");

  const key = useParams().key;

  const decodedKey = atob(key).split(" ");
  let decodedUser = decodedKey[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    changePassword();
  };

  const changePassword = () => {
    let postBody = {
      password: password,
    };
    console.log(decodedUser)
    axios.get(
      `${PSB_API_URL}/api/public/user/${decodedUser}`)
        .then((res) => {
          if (res.status === 200) {
            axios
              .post(`${PSB_API_URL}/api/reset/${decodedUser}`, postBody)
              .then((res) => console.log(res))
              .catch((error) => console.log("POST CHANGE PW ERROR: ",error));
          } else if (res.status === 204) {
            console.log("user doesn't exist");
          }
        })
        .catch((error) => console.log("GET ERROR: ", error))
    ;
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container>
        <Row>
          <h1>Change PW</h1>
          <Form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Input Your New Password</h3>
              <div className="form-group mt-3">
                <label>Enter Password</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g psb"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button variant="outline-dark" type="submit">
                  Submit
                </Button>
              </div>
              <div className="text-center mt-3">
                Back to <Link to="/login">Login</Link>
              </div>
            </div>
          </Form>
        </Row>
        <Row></Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
};

export default ChangePassword;
