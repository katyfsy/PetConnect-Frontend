import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import "./userProfile.css"
import { useNavigate } from 'react-router-dom';


function LoginCard() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
    setUserNameSession();
  }

  function setUserNameSession(){
    axios.get('http://identity.galvanizelabs.net/api/account', {
      headers: {
        'Authorization': getToken()
      }})
      .then((res)=> localStorage.setItem('username', res.data.user.username))
  }

  function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log("Logged in!")
    return userToken;
  }

  function loginUser(credentials) {
    axios.post('http://identity.galvanizelabs.net/api/auth', JSON.stringify(credentials))
    .then((res) =>  setToken(res.headers.authorization))
    .then(() => {navigate("/", { replace: true })})
    .catch((error) => console.log(error.response.data))
   }

  const handleSubmit = async e => {
    e.preventDefault();
    loginUser({username,password});
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
        <div className="d-grid gap-2 mt-4">
          <Button variant='outline-dark' onClick={getToken}>
            Get Token
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