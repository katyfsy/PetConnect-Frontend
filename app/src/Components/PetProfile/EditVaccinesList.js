import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import EditVaccineModal from "./EditVaccineModal.js";

const EditVaccinesList = (props) => {
  console.log("THIS PET: ", props.pet);
  // const [showEditVaccine, setShowEditVaccine] = useState(false);
  // const [vaccineFields, setVaccineFields] = useState({
  //   name: null,
  //   date: null,
  //   notes: null
  // });

  // const handleShow = () => setShowEditVaccine(true);
  // const handleHide = () => setShowEditVaccine(false);


  // const vaccineClicked = (vaccine) => {
  //   handleShow();
  // };

  const vaccines = props.pet.vaccines;
  const vaccineItems = vaccines.map((vaccine) =>
    <ListGroup.Item key={vaccine.vaccineId} action onClick={console.log("Click!")}> {vaccine.name} </ListGroup.Item>
  )

  if (vaccines.length < 1) {
    return (
      <div>
      <ListGroup>
      <ListGroup.Item > {props.pet.name} has no vaccine history </ListGroup.Item>
      </ListGroup>
      <EditVaccineModal pet={thisPet}/>
    </div>
    )
  }

  return (
    <div>
      <ListGroup>
        {vaccineItems}
      </ListGroup>
    </div>
  );
}

export default EditVaccinesList;