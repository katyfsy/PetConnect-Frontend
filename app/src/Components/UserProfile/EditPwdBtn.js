import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBearerToken, getUser, clearStorage } from "./psb-exports";
import "./EditPwdBtn.css";


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

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

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
          handleClose();
          setSuccessMessage("");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Incorrect Current Password or Server Error");
      });
  };

  const pwdValidator = () => {
    if (newPassword !== newPasswordConf) {
      setMessage("Passwords do not match");
    } else if (newPassword === currPassword) {
      setMessage("New and current passwords are the same");
    } else {
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
      <Button id="edit-password-button" onClick={handleShow}>
        Edit Password
      </Button>

      <Modal show={show}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton onClick={handleClose} style={{backgroundColor: "#8F9ED9"}}>
            <Modal.Title style={{color: "white"}}>Edit Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div></div>
            <Row className="form-group mt-4">
              <Col>
                <div className="form-group mt-1">
                  <Row>
                    <Col>
                      <label>Current Password</label>
                    </Col>
                    <Col>
                      <div onClick={togglePassword}>
                        {passwordShown ? (
                          <i className="bi bi-eye i-edit"></i>
                        ) : (
                          <i className="bi bi-eye-slash i-edit"></i>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <input
                    type={passwordShown ? "text" : "password"}
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
                    type={passwordShown ? "text" : "password"}
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
                    type={passwordShown ? "text" : "password"}
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
            <Button type="submit" id="edit-password-button">
              Save New Password
            </Button>
            <Button id="edit-password-button" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditPwdBtn;
