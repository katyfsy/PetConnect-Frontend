import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';
import {getUser} from '../UserProfile/psb-exports';
import FavButton from '../UserProfile/FavButton';
import './PetCard.css';


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

      <Card  >
          <div className="favBtn" onClick={handleShow} >
            <FavButton petId={petId} isFavor={isFavor} setResultPageIsFav={setResultPageIsFav}/>
          </div>
          <div className="imgRow">
            <Link to={`/pet/${petId}`} >
              <Card.Img  className="petImg"src={coverPhoto} />
            </Link>
          </div>
          <Card.Body className="petCardCustom">
              <Card.Title className="petName">{name}</Card.Title>
              <Card.Text>
                {gender}
              </Card.Text>
              <Card.Text>
                {age} * {breed}
              </Card.Text>
              <Card.Text>
                Rescued by {owner}
              </Card.Text>
          </Card.Body>
      </Card>

{/* card duplicate */}
{/*}
      <div className="petCard">
        <div className="row" >
          <div onClick={handleShow} >
            <FavButton petId={petId} isFavor={isFavor} setResultPageIsFav={setResultPageIsFav}/>
          </div>
          <a href={`/pet/${petId}`} >
            <img className="petCardPhoto" src={coverPhoto} /> </a>
        </div>

        <div className="row">
          <Card.Body>
            <div className="row">
              <Card.Title>{name}</Card.Title>
              </div>
              <div className="row">
              <Card.Text>
                {gender}
              </Card.Text>
              <Card.Text>
                {age} * {breed}
              </Card.Text>
            </div>
            <div className="row">
              <Card.Text>
                Rescued by {owner}
              </Card.Text>
            </div>

          </Card.Body>
        </div>
      </div>
  {}

{/* modals */}
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