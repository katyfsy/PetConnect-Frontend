import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./userProfile.css"

function loginUser(credentials) {
  fetch('http://identity.galvanizelabs.net/api/auth', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then((res) => console.log(res.status))
    .catch((error) => console.log("error", error));
 }

function LoginCard() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    loginUser({username,password});
    // const token = loginUser({
    //   username,
    //   password
    // });
    // setToken(token);
    // console.log("token is: ", token);
  }
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
            onChange={e => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-4">
          <Button variant='outline-dark' type="submit">
            Log In
          </Button>
        </div>
        <div className="text-center mt-3">
          Don't have an account?{" "}
            <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Form>
  </div>
  )
}
export default LoginCard;