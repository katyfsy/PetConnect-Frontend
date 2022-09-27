import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import "./userProfile.css";
import DeleteBtn from "./DeleteBtn";
import { useNavigate } from "react-router-dom";
import { PSB_API_URL, getBearerToken, getUser } from "./psb-exports";
import PasswordStrengthIndicator from "./PwdIndicator.js";

const SignUpCard = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userType, setUserType] = useState();
  const [businessName, setBusinessName] = useState();
  const [businessNameShown, setbusinessNameShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
    lowercase: null,
    uppercase: null,
  });

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

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const toggleBusinessName = (role) => {
    if (role === "USER") {
      setbusinessNameShown(false);
    } else {
      setbusinessNameShown(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    pwdValidator();
    // createUserService({ firstName, lastName, username, password, email });
  };

  const pwdValidator = () => {
    console.log(/\s/g.test(username));
    console.log(/[A-Z]/.test(username));
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
    } else if (/\s/g.test(username) || /[A-Z]/.test(username)) {
      setErrMessage("Username must be lowercase and have no spaces");
    } else if (/\s/g.test(username)) {
      setErrMessage("Username must be lowercase and have no spaces");
    } else {
      setErrMessage("");
      createUserService({ firstName, lastName, username, password, email });
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   console.log(userType);
  // };

  const deleteAccountService = (token) => {
    const date = new Date().toLocaleDateString("FR-CA");
    const time = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let terms = date + "T" + time;
    let rqstBody = {
      username: username,
      termsAcceptedDate: terms,
      password: password,
    };
    axios
      .delete("http://identity.galvanizelabs.net/api/account/delete", {
        data: rqstBody,
        headers: { Authorization: token },
      })
      .catch((error) => {
        console.log(error);
        setErrMessage("Error Creating New Account");
        console.log("error deleting newly created account API"); // delete at production
      });
  };

  const createUserApi = () => {
    let newUserBody = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      userType: userType,
      businessName: businessName,
      userPhoto: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    };
    let apiLogin = {
      username: username,
      password: password,
    };
    axios
      .post("http://identity.galvanizelabs.net/api/auth", apiLogin)
      .then((res) => {
        axios
          .post(`${PSB_API_URL}/api/users`, newUserBody, {
            headers: { Authorization: res.headers.authorization },
          })
          .then((response) => {
            if (response.status === 202) {
              setSuccessMessage("Account Successfully Created");
            }
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
            deleteAccountService(res.headers.authorization);
            setErrMessage("Error Creating New Account");
            console.log("error at API POST new account"); // delete at production
            console.log(error);
          });
      })
      .catch((error) => {
        setErrMessage("Error Creating New Account");
        console.log(
          "error logging in service to get token to create account on API"
        ); // delete at production
      });
  };

  const createUserService = (credentials) => {
    axios
      .post(
        "http://identity.galvanizelabs.net/api/account/register",
        credentials
      )
      .then((res) => {
        if (res.status === 202) createUserApi();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrMessage(error.response.data);
        } else {
          setErrMessage("Error Creating New Account");
        }
        console.log("error at service POST new account"); // delete at production
        console.log(error);
      });
  };

  return (
    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h4 className="Auth-form-title">Sign Up</h4>
          <Row className="justify-content-center">
            <div className="text-center text-success">{successMessage}</div>
          </Row>
          <Row className="justify-content-center">
            <div className="text-center text-danger">{errMessage}</div>
          </Row>
          <div className="form-group mt-1">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-control mt-1"
              placeholder="e.g psb"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <Row>
            <Col>
              <div className="form-group mt-1">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  className="form-control mt-1"
                  placeholder="e.g Pet Shop"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group mt-1">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  className="form-control mt-1"
                  placeholder="e.g Boys"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <div className="form-group mt-2">
            <label>Email address</label>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="Used for password recovery"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {passwordFocused && (
            <PasswordStrengthIndicator validity={passwordValidity} />
          )}

          <div className="form-group mt-1">
            <Row>
              <Col>
                <label>Password </label>
              </Col>
              <Col>
                <div onClick={togglePassword}>
                  {passwordShown ? (
                    <i className="bi bi-eye i-signup"></i>
                  ) : (
                    <i className="bi bi-eye-slash i-signup"></i>
                  )}
                </div>
              </Col>
              <Col md="auto"></Col>
            </Row>
            <input
              type={passwordShown ? "text" : "password"}
              required
              className="form-control mt-1"
              placeholder="Password"
              onFocus={() => setPasswordFocused(true)}
              onChange={(e) => onChangePassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-2">
                <Form.Check
                  inline
                  required
                  label="USER"
                  value="USER"
                  name="group1"
                  type={type}
                  onClick={(e) => toggleBusinessName(e.target.value)}
                  id={`inline-${type}-1`}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <Form.Check
                  inline
                  required
                  label="ORGANIZATION"
                  value="ORGANIZATION"
                  name="group1"
                  type={type}
                  onClick={(e) => toggleBusinessName(e.target.value)}
                  id={`inline-${type}-2`}
                  onChange={(e) => setUserType(e.target.value)}
                />
              </div>
            ))}
          </div>
          <div>
            {businessNameShown ? (
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g Pet Shop Boys"
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <div className="mt-3"></div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-grid mt-2">
            <Button style={{backgroundColor: "#8F9ED9"}} type="submit">
              Sign Up
            </Button>
          </div>
          <div className="text-center mt-3">
            Already registered? <Link style={{color: "#8F9ED9"}} to="/login">Log In</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default SignUpCard;
