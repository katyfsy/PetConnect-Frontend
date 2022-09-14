import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';


function PetCard({name, type, gender, age, breed}) {
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);


  const handleCloseModal = () => setShowModal(false);
  const handleShow = () => {
    if (localStorage.getItem("token") === null) {
      setShowModal(true)
    } else {
      //mark pet as favorite
      toggleShowToast();
    }
  }

  return(
    <>
      <Card style={{ width: '18rem' }}>
        <Link to="/pets" style={{ textDecoration: 'none', color: 'black' }}>
          <Card.Img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350/100px180" />
        </Link>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {gender}
          </Card.Text>
          <Card.Text>
            {age} * {breed}
          </Card.Text>
          <Card.Text>
            Rescued by Humane Society
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>Favorite</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Join Pet Connect to favorite pets</Modal.Title>
      </Modal.Header>
      <Modal.Body>Save to your account</Modal.Body>
      <Modal.Footer>
        <Link to="/signup">
          <Button variant="primary" onClick={handleCloseModal}>
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="primary" onClick={handleCloseModal}>
            Login
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
    <ToastContainer className="p-3" position='top-end'>
      <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">PetConnect</strong>
            </Toast.Header>
            <Toast.Body>{name} marked as favorite</Toast.Body>
      </Toast>
    </ToastContainer>
   </>
  )

}

export default PetCard;