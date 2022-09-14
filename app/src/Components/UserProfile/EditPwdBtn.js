import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBearerToken, getUser, clearStorage } from "./psb-exports";

const EditPwdBtn = () => {
  const [show, setShow] = useState(false);
  const [currPassword, setcurrPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConf, setNewPasswordConf] = useState();
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();


  const changePassword = () => {
    let rqstBody = {
      username: getUser(),
      currentPassword: currPassword,
      newPassword: newPassword,
    };


    axios
      .patch("http://identity.galvanizelabs.net/api/account/passwd", rqstBody, {
        headers: { Authorization: getBearerToken() },
      })
      .then(() => setSuccessMessage("Password Changed!"))
      .then(() => {
        setTimeout(() => {
            handleClose()
            setSuccessMessage("")
          }, 1000)
      })
      .catch((error) => {
        console.log(error);
        setMessage("Incorrect Current Password or Server Error");
      });
  };

  const pwdValidator = () => {
    if (newPassword !== newPasswordConf) {
      setMessage("Passwords do not match");
    } else if (newPassword === currPassword){
        setMessage("New and current passwords are the same")
    } 
    else {
      setMessage("");
      changePassword();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    pwdValidator();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Edit Password
      </Button>

      <Modal show={show}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Edit Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div></div>
            <Row className="form-group mt-4">
              <Col>
                <div className="form-group mt-1">
                  <label>Current Password</label>
                  <input
                    type="password"
                    required
                    className="form-control mt-1"
                    placeholder="Enter Current Password"
                    onChange={(e) => setcurrPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="form-group mt-4">
              <Col>
                <div className="form-group mt-1">
                  <label>New Password</label>
                  <input
                    type="password"
                    required
                    className="form-control mt-1"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group mt-1">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    required
                    className="form-control mt-1"
                    placeholder="Enter New Password Again"
                    onChange={(e) => setNewPasswordConf(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
              <div className="text-center text-success">{successMessage}</div>
            </Row>
            <Row className="mt-3 justify-content-center">
              <div className="text-center text-danger">{message}</div>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-1">
            <Button type="submit" variant="outline-dark">
              Save New Password
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditPwdBtn;
