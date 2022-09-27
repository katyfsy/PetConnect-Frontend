import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddVaccineForm from "./AddVaccineForm.js";
import "./AddVaccineModal.css";

const AddVaccineModal = (props) => {
  // const [vaccineFields, setVaccineFields] = useState(props.vaccine);

  const handleShow = () => props.setShowVaccineForm(true);
  const handleHide = () => props.setShowVaccineForm(false);

  const handleEditVaccine = (e) => {
    e.preventDefault();
    console.log("Vaccine Fields: ", vaccineFields);
    // fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/vaccines/addVaccine?petId=${props.petId}&vaccineName=${vaccineFields.name}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(vaccineFields),
    // })
    //   .then((response) => response.json())
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
    handleHide();
  };

  // console.log(vaccineFields);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Vaccine Fields: ", props.vaccine);
    // fetch(
    //   `http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/vaccines/addVaccine?petId=${props.petId}&vaccineName=${vaccineFields.name}`,
    //   {
    //     method: "POST",
    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     // },
    //     // body: JSON.stringify(vaccineFields),
    //   }
    // )
    //   .then((response) => response.json())
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
    if (props.edit) {
      props.handleEditVaccineInList(props.vaccine);
    } else {
      props.handleAddVaccineToList(props.vaccine);
    }
    handleHide();
  };

  function handleDelete(e) {
    e.preventDefault();
    props.handleDeleteVaccineInModal(props.vaccine);
    handleHide();
  }
  const handleOnChange = (e) => {
    props.setVaccineFields({
      ...props.vaccine,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Add Vaccine Record
      </Button> */}
      {/* <Button
        onClick={handleShow}
        className="vaccination-pet-button"
        variant="outline-secondary"
      >
        Add a vaccination record...
      </Button> */}
      <Modal
        show={props.showVaccineForm}
        onHide={handleHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="vaccine-form-title">
            Add A Vaccine Record For {props.petName}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddVaccineForm
            owner={props.owner}
            petName={props.petName}
            edit={props.edit}
            petId={props.petId}
            handleOnChange={handleOnChange}
            vaccine={props.vaccine}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Save Vaccine Record
          </Button>
          {props.edit ? (
            <Button variant="danger" onClick={(e) => handleDelete(e)}>
              Delete Vaccine Record
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddVaccineModal;
