import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBtn = () => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const clearStorage = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
  }

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  const deleteAccountAPI = () => {
    axios
      .delete(
        `http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/user/${username}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .catch((error) => {
        console.log(error);
        alert("Error deleting API");
      });
  };

  
  const deleteAccountService = () => {
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
        headers: { Authorization: getToken() },
      })
      .then(() => deleteAccountAPI())
      .then(() => clearStorage())
      .then(() => alert("Account Deleted!"))
      .then(() => navigate("/", { replace: true }))
      .catch((error) => {
        console.log(error);
        alert("Error Delete Service");
      });
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Delete Account
      </Button>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Enter Username and Password to delete account.</div>
          <Form>
            <Row className="form-group mt-4">
              <Col>
                <div className="form-group mt-1">
                  <label>Username</label>
                  <input
                    type="text"
                    required
                    className="form-control mt-1"
                    placeholder="This action"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group mt-1">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className="form-control mt-1"
                    placeholder="cannot be undone!"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="mt-4">
          <Button variant="danger" onClick={deleteAccountService}>
            Delete Account
          </Button>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBtn;
