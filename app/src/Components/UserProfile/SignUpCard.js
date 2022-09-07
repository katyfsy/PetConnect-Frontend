import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./userProfile.css"


function SignUpCard() {
  return (
    <div className="Auth-form-container">
    <Form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign Up</h3>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="e.g psb"
          />
        </div>
        <Row>
            <Col>
        <div className="form-group mt-1">
          <label>First Name</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="e.g Pet Shop"
          />
        </div>
            </Col>
            <Col>
        <div className="form-group mt-1">
          <label>Last Name</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="e.g Boys"
          />
        </div>
            </Col>
        </Row>
        <div className="form-group mt-2">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group mt-1">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Password"
          />
        </div>
        <div className="d-grid mt-4">
          <Button variant='outline-dark' type="submit">
            Sign Up
          </Button>
        </div>
        <div className="text-center mt-3">
          Already registered?{" "}
            <Link to='/login'>Log In</Link>
        </div>
      </div>
    </Form>
  </div>
  )
}
export default SignUpCard;