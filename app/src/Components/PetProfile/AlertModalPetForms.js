import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOtter, faHippo, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import "./AlertModalPetForms.css";


const Alert = (props) => {
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="pet-forms-alert"
      centered
    >
      <Modal.Body>
        <Modal.Title className={`alert-header-container alert-${props.type}`} id="pet-forms-alert">
          <FontAwesomeIcon className="alert-icon"icon={(props.type === "success") ? faCircleCheck : faCircleExclamation} />
          {/* <FontAwesomeIcon className="alert-icon"icon={(props.type === "success") ? faHippo : faOtter} /> */}
          <div className="alert-header-title">{props.title}</div>
        </Modal.Title>
        <div className="alert-text">
          {props.text}
        </div>
        <div className="alert-button-container">
          <Button variant={(props.type === "success") ? "outline-success" : "outline-secondary"} onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}


export default Alert;