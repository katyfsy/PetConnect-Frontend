import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';
import {getUser} from '../UserProfile/psb-exports';
import FavButton from '../UserProfile/FavButton';


function PetCard({name, type, gender, age, breed, coverPhoto, petId, owner, isFavor}) {
  const [showModal, setShowModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const [ToastText, setToastText] = useState("");

  const [resultPageIsFav, setResultPageIsFav] = useState(isFavor);

  useEffect(()=>{
    setResultPageIsFav(isFavor);
  },[isFavor])


  const handleCloseModal = () => setShowModal(false);
  const handleShow = () => {
    if (getUser() === null) {
      setShowModal(true)
    } else {
      //mark pet as favorite
      if (resultPageIsFav === true) {
        setToastText("removed from favorites");
      } else {
        setToastText("marked as favorite");
      }
      toggleShowToast();
    }
  }

  return(
    <>
      <Card style={{ width: '18rem' }}>
        <div onClick={handleShow} style={{height: '0px'}}>
          <FavButton petId={petId} isFavor={isFavor} setResultPageIsFav={setResultPageIsFav}/>
        </div>
        <Link to={`/pet/${petId}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Card.Img src={coverPhoto} style={{height: '15rem'}}/>
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
            Rescued by {owner}
          </Card.Text>
          {/* <Button variant="primary" onClick={handleShow}>Favorite</Button> */}

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
    <ToastContainer className="p-3" position='top-end' containerPosition='fixed'>
      <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">PetConnect</strong>
            </Toast.Header>
            <Toast.Body>{name} {ToastText}</Toast.Body>
      </Toast>
    </ToastContainer>
   </>
  )

}

export default PetCard;