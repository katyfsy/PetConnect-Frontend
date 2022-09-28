import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faOtter,
  faHippo,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { getUser } from "../UserProfile/psb-exports";
import "./AlertModalPetForms.css";

const Alert = (props) => {


  const navigate = useNavigate();
  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    if (props.buttonAction === "back") {
      navigate(`/pet/${id}`, { replace: true });
    } else if (props.buttonAction === "backToPetlist") {
      navigate(`/petlist/${getUser()}`, { replace: true })
    }
  };

  return (
    <Modal {...props} size="" aria-labelledby="pet-forms-alert" centered>
      <Modal.Body>
        <Modal.Title
          className={`alert-header-container alert-${props.type}`}
          id="pet-forms-alert"
        >
          <FontAwesomeIcon
            className="alert-icon"
            icon={
              props.type === "success" ? faCircleCheck : faCircleExclamation
            }
          />
          {/* <FontAwesomeIcon className="alert-icon"icon={(props.type === "success") ? faHippo : faOtter} /> */}
          <div className="alert-header-title">{props.title}</div>
        </Modal.Title>
        <div className="alert-text">{props.text}</div>
        <div className="alert-button-container">
          {props.buttonCancel ? <Button
            variant={
              "outline-secondary"
            }
            onClick={props.onHide}
          >
            Cancel
          </Button> : <></>}
          {props.buttonDelete ?
            <Button
              variant={
                "outline-danger"
              }
              onClick={props.deleteCallback}>
              Delete
            </Button> : <></>}
          {props.buttonConfirm ?
            <Button
              variant={
                "outline-danger"
              }
              onClick={() => navigateToPetProfile(props.petId)}>
              Confirm
            </Button> : <></>}
          {props.buttonClose ?
            <Button
              variant={
                props.type === "success" ? "outline-success" : "outline-secondary"
              }
              onClick={props.onHide}
            >
              Close
            </Button> : <></>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Alert;
