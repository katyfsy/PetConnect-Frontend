import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./userProfile.css";
import DeleteBtn from './DeleteBtn';
import { useNavigate } from "react-router-dom";

function SignUpCard() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserService({ firstName, lastName, username, password, email });
  };

  function createUserApi() {
    let newUserBody = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    let apiLogin = {
      username: username,
      password: password,
    };
    axios
      .post("http://identity.galvanizelabs.net/api/auth", apiLogin)
      .then((res) => {
        axios
          .post("http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/users", newUserBody, {
            headers: { Authorization: res.headers.authorization },
          })
          .then((response)=> {if(response.status===200) navigate("/login", { replace: true })} );
      })
      .catch((error) => alert("Error Signup API")); //delete service account if it hits this error
  }

  function createUserService(credentials) {
    axios
      .post(
        "http://identity.galvanizelabs.net/api/account/register",
        credentials
      )
      .then((res) => {
        if (res.status === 202) createUserApi();
      })
      .catch((error) => alert("Error Signup Service"));
  }

  return (
    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
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
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-1">
            <label>Password</label>
            <input
              type="password"
              required
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid mt-4">
            <Button variant="outline-dark" type="submit">
              Sign Up
            </Button>
          </div>
          <div className="text-center mt-3">
            Already registered? <Link to="/login">Log In</Link>
          </div>
          <div className="d-grid mt-4">
            <DeleteBtn />
          </div>
        </div>
      </Form>
    </div>
  );
}
export default SignUpCard;
