import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";


const EditVaccineModal = (props) => {
  console.log("PROPS: ", props);
  const [showEditVaccine, setShowEditVaccine] = useState(false);
  const [vaccineFields, setVaccineFields] = useState({
    name: null,
    date: null,
    notes: null
  });

  const handleShow = () => setShowEditVaccine(true);
  const handleHide = () => setShowEditVaccine(false);


  const handleDeleteVaccine = (e) => {
    e.preventDefault();
    console.log("Vaccine to DELETE: ", e.target);
  }


  const handleEditVaccine = (e) => {
    e.preventDefault();
    console.log("Vaccine Fields: ", vaccineFields);
    fetch(`http://a920770adff35431fabb492dfb7a6d1c-1427688145.us-west-2.elb.amazonaws.com:8080/api/pets/vaccines/addVaccine?petId=${props.petId}&vaccineName=${vaccineFields.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vaccineFields),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        console.log(data);
      });
      setShowEditVaccine(false);
  }

  const handleOnChange = (e) => {
    setVaccineFields({
      ...vaccineFields,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <Button variant="primary" onClick={handleDeleteVaccine}>
        Delete Vaccine Record
      </Button>

      <Modal show={showEditVaccine} onHide={handleHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="vaccine-form-title">Add A Vaccine Record For {props.petName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <EditVaccineForm
                          owner={props.owner} petName={props.petName}
                          petId={props.petId} handleOnChange={handleOnChange}/> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditVaccine}>
            Save Vaccine Record
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVaccineModal;