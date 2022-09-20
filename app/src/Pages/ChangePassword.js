import React, { useState, useEffect } from "react";
import Navigationbar from "../Components/Default/Navbar";
import Header from "../Components/Default/Header";
import Footer from "../Components/Default/Footer";
import { Container, Row, Table, Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthIndicator from "../Components/UserProfile/PwdIndicator.js";

import User from "../Components/UserProfile/User";
import {
  getBearerToken,
  getUser,
  PSB_API_URL,
} from "../Components/UserProfile/psb-exports";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [resetUrl, setResetUrl] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
    lowercase: null,
    uppercase: null,
  });

  const key = useParams().key;

  const decodedKey = atob(key).split(" ");
  let decodedUser = decodedKey[0];

  const onChangePassword = (password) => {
    const isNumberRegx = /[0-9]/;
    const specialCharacterRegx = /[!@#$%^&*]/;
    const lowercaseRegx = /[a-z]/;
    const uppercaseRegx = /[A-Z]/;
    setPassword(password);

    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
      lowercase: lowercaseRegx.test(password) ? true : false,
      uppercase: uppercaseRegx.test(password) ? true : false,
    });
  };

  const pwdValidator = () => {
    if (password.length < 8) {
      setErrMessage("Your password must be at least 8 characters");
    } else if (password.length > 16) {
      setErrMessage("Your password must be fewer than 16 characters");
    } else if (password.search(/[!@#$%^&*]/) < 0) {
      setErrMessage(
        "Your password must contain at least one special character from !@#$%^&*"
      );
    } else if (password.search(/[a-z]/) < 0) {
      setErrMessage("Your password must contain at least one lowercase letter");
    } else if (password.search(/[A-Z]/) < 0) {
      setErrMessage("Your password must contain at least one uppercase letter");
    } else if (password.search(/[0-9]/) < 0) {
      setErrMessage("Your password must contain at least one digit");
    } else if (/\s/g.test(password)) {
      setErrMessage("Password must not have any spaces");
    } else {
      setErrMessage("");
      changePassword();
    }
  };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    pwdValidator();
  };

  const changePassword = () => {
    let postBody = {
      password: password,
    };
    console.log(decodedUser);
    axios
      .get(`${PSB_API_URL}/api/public/user/${decodedUser}`)
      .then((res) => {
        if (res.status === 200) {
          axios
            .post(`${PSB_API_URL}/api/reset/${decodedUser}`, postBody)
            .then((res) => {
              setSuccessMessage("Password has been updated!");
              console.log(res);
            })
            .then(() => {
              setTimeout(() => {
                setSuccessMessage("Redirecting to Login");
              }, 1000);
            })
            .then(() => {
              setTimeout(() => {
                setSuccessMessage("");
                navigate("/login", { replace: true });
              }, 3000);
            })
            .catch((error) => {
              setErrMessage("Error Changing Password at Service");
              console.log("POST CHANGE PW ERROR: ", error);
            });
        } else if (res.status === 204) {
          setErrMessage("User doesn't exist");
        }
      })
      .catch((error) => {
        setErrMessage("Error Finding User");
        console.log("GET ERROR: ", error);
      });
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Navigationbar />
      <Container className="d-flex justify-content-center">
        <Row>
          <h1>Change PW</h1>
          <Form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <Row>
                <div className="text-center text-success">{successMessage}</div>
              </Row>
              <Row>
                <div className="text-center text-danger">{errMessage}</div>
              </Row>
              <h3 className="Auth-form-title">Input Your New Password</h3>
            </div>
            <Row>
              {passwordFocused && (
                <PasswordStrengthIndicator validity={passwordValidity} />
              )}
            </Row>
            <div className="form-group mt-1">
              <Row className="d-flex justify-content-center">
                <label>Enter Password</label>
              </Row>

              <div className="form-group mt-1">
                <Row className="justify-content-center">
                  <Col xs={7}>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      required
                      placeholder="supersecurepassword"
                      onFocus={() => setPasswordFocused(true)}
                      onChange={(e) => onChangePassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </div>
              <Row className="justify-content-center">
                <Col xs={1}></Col>
                <Col xs={3}>
                  <div className="d-grid gap-2 mt-4">
                    <Button variant="outline-dark" type="submit">
                      Submit
                    </Button>
                  </div>
                </Col>
                <Col xs={1}>
                  <div onClick={togglePassword}>
                    {passwordShown ? (
                      <i className="bi bi-eye i-changepw"></i>
                    ) : (
                      <i className="bi bi-eye-slash i-changepw"></i>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="text-center mt-3">
                Back to <Link to="/login">Login</Link>
              </div>
            </div>
            <div className="d-grid gap-2 mt-4">
                    <Button variant="outline-dark" type="submit">
                      Build Token
                    </Button>
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
