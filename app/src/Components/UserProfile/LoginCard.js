import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./userProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

import {
  getBearerToken,
  getUser,
  setTokenLocal,
  setTokenSession,
  setUserNameLocal,
  setUserNameSession,
  PSB_API_URL,
} from "./psb-exports";

const LoginCard = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const setToken = (token) => {
    if (rememberMe) {
      setTokenLocal(token);
    } else {
      setTokenSession(token);
    }
  };

  const setUser = (user) => {
    if (rememberMe) {
      setUserNameLocal(user);
    } else {
      setUserNameSession(user);
    }
  };

  const loginUser = (credentials) => {
    axios
      .post(
        "http://identity.galvanizelabs.net/api/auth",
        JSON.stringify(credentials)
      )
      .then((res) => setToken(res.headers.authorization))
      .then(() => setUser(username))
      .then(() => {
        console.log("token: ", getBearerToken());
        console.log("user: ", getUser());
        if (location.pathname === '/messages') {
          navigate("/messages", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        loginFail();
      });
  };

  const loginFail= () => {
    Swal.fire({
      position: 'center',
      title: 'Username or Password Incorrect!',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SERVER URL: ", process.env.PSB_API_URL);
    loginUser({ username, password });
  };

  const handleRememberMe = (e) => {
    if (e.target.checked) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  };

  return (
    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g psb"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <Row>
              <Col>
                <label>Password </label>
              </Col>
              <Col>
                <div onClick={togglePassword}>
                  {passwordShown ? (
                    <i className="bi bi-eye i-login"></i>
                  ) : (
                    <i className="bi bi-eye-slash i-login"></i>
                  )}
                </div>
              </Col>
            </Row>

            <input
              type={passwordShown ? "text" : "password"}
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-4 justify-content-center">
            <Form.Check aria-label="option 1" type="checkbox" name="group1">
              <Form.Check.Input
                type="checkbox"
                onChange={(e) => handleRememberMe(e)}
              />
              <Form.Check.Label>Remember Me</Form.Check.Label>
            </Form.Check>
          </div>
          <div className="d-grid gap-2 mt-4">
            <Button style={{backgroundColor: "#8F9ED9"}} type="submit">
              Log In
            </Button>
          </div>

          <div className="text-center mt-3" >
            Forgot password? <Link style={{color: "#8F9ED9"}} to="/user/reset">Reset</Link>
          </div>
          <div className="text-center mt-3">
            Don't have an account? <Link style={{color: "#8F9ED9"}} to="/signup">Sign Up</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default LoginCard;
