import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getBearerToken, PSB_API_URL, clearStorage } from "./psb-exports";

const DeleteBtn = () => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConf(true);
  };

  const deleteAccountConf = () => {
    deleteAccountService();
  };

  // Handle confirmation modal
  const [showConf, setShowConf] = useState(false);
  const handleShowConf = () => setShowConf(true);
  const handleCloseConf = () => setShowConf(false);

  const deleteAccountAPI = () => {
    axios
      .delete(`${PSB_API_URL}/api/user/${username}`, {
        headers: { Authorization: getBearerToken() },
      })
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
        headers: { Authorization: getBearerToken() },
      })
      .then(() => deleteAccountAPI())
      .then(() => clearStorage())
      .then(() => alert("Account Deleted!"))
      .then(() => navigate("/", { replace: true }))
      .catch((error) => {
        console.log(error);
        alert("Password or Username Incorrect!");
      });
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleShow}>
        Delete Account
      </Button>
      <Modal show={show}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>Enter Username and Password to delete account.</div>
            <Row className="form-group mt-4">
                <div className="form-group mt-1">
                  <Row>
                    <Col xs={6}>
                    <label>Username</label>
                    </Col>
                    <Col xs={6}>
                    <label>Password</label>
                    </Col>

                  </Row>
                  {/* <label>Username</label> */}
                  <Row>
                    <Col xs={6}>
                      <input
                        type="text"
                        required
                        className="form-control mt-1"
                        placeholder="Cthon98"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Col>
                    <Col xs={6}>
                      <input
                        type={passwordShown ? "text" : "password"}
                        required
                        className="form-control mt-1"
                        placeholder="hunter2"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>

                      <div onClick={togglePassword}>
                        {passwordShown ? (
                          <i className="bi bi-eye i-delete"></i>
                        ) : (
                          <i className="bi bi-eye-slash i-delete"></i>
                        )}
                      </div>

                    </Row>
                </div>
            </Row>
          </Modal.Body>
          <Modal.Footer className="mt-4">
            <Button type="submit" variant="danger">
              Delete Account
            </Button>
            <Modal centered show={showConf} onHide={handleCloseConf}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body>This action cannot be undone!</Modal.Body>
              <Modal.Footer>
                <Button variant="outline-danger" onClick={deleteAccountConf}>
                  Yes
                </Button>
                <Button variant="outline-dark" onClick={handleCloseConf}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteBtn;
