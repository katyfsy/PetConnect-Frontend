import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import EditVaccineModal from "./EditVaccineModal.js";

const EditVaccinesList = (props) => {
  const [showEditVaccine, setShowEditVaccine] = useState(false);
  const [vaccineFields, setVaccineFields] = useState({
    name: null,
    date: null,
    notes: null
  });

  const handleShow = () => setShowEditVaccine(true);
  const handleHide = () => setShowEditVaccine(false);


  const handleVaccineClick = (e) => {
    console.log("Clicked Vaccine: ", e.target);
    handleShow();
  };

  const vaccines = props.pet.vaccines;
  const vaccineItems = vaccines.map((vaccine) =>
    <ListGroup.Item key={vaccine.vaccineId} vaccine={vaccine} action onClick={handleVaccineClick}> {vaccine.name}
      <div className="edit-vaccine-date"> {vaccine.date} </div>
    </ListGroup.Item>
  )

  if (vaccines.length < 1) {
    return (
      <div>
      <ListGroup>
      <ListGroup.Item> {props.pet.name} has no vaccine history </ListGroup.Item>
      </ListGroup>
    </div>
    )
  }

  return (
    <div>
      <ListGroup >
        {vaccineItems}
      </ListGroup>
      <EditVaccineModal pet={props.pet}/>
    </div>
  );
}

export default EditVaccinesList;