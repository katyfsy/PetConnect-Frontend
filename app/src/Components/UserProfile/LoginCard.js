import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./userProfile.css"


function LoginCard() {
  return (
    <div className="Auth-form-container">
    <Form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="e.g psb"
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Password"
          />
        </div>
        <div className="d-grid gap-2 mt-4">
          <Button variant='outline-dark' type="submit">
            Log In
          </Button>
        </div>
        <div className="text-center mt-4">
          Don't have an account?{" "}
            <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Form>
  </div>
  )
}
export default LoginCard;