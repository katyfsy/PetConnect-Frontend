import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import AddVaccineForm from "./AddVaccineForm.js";
import "./AddVaccineModal.css";


const AddVaccineModal = (props) => {
  const [showVaccineForm, setShowVaccineForm] = useState(props.showEditVaccine);
  const [vaccineFields, setVaccineFields] = useState(props.edit ? props.vaccine : {
    name: null,
    date: null,
    notes: null
  });

  const handleShow = () => setShowVaccineForm(true);
  const handleHide = () => setShowVaccineForm(false);
  
  const handleEditVaccine = (e) => {
    e.preventDefault();
    console.log("Vaccine Fields: ", vaccineFields);
    // fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/vaccines/addVaccine?petId=${props.petId}&vaccineName=${vaccineFields.name}`, {
    //   method: "POST",
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
      setShowEditVaccine(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vaccine Fields: ", vaccineFields);
    fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/vaccines/addVaccine?petId=${props.petId}&vaccineName=${vaccineFields.name}`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(vaccineFields),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);
      });
      setShowVaccineForm(false);
      props.refetchPet(Math.random());
  }

  const handleOnChange = (e) => {
    setVaccineFields({
      ...vaccineFields,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Vaccine Record
      </Button>

      <Modal show={showVaccineForm} onHide={handleHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="vaccine-form-title">Add A Vaccine Record For {props.petName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddVaccineForm
                          owner={props.owner} petName={props.petName} edit={props.edit}
                          petId={props.petId} handleOnChange={handleOnChange} vaccine={vaccineFields}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.edit ? handleEditVaccine : handleSubmit}>
            Save Vaccine Record
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddVaccineModal;