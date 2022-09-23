import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import AddVaccineModal from "./AddVaccineModal.js";

const EditVaccinesList = (props) => {
  const [showEditVaccine, setShowEditVaccine] = useState(false);
  const [vaccineFields, setVaccineFields] = useState({
    name: null,
    date: null,
    notes: null
  });

  const handleShow = () => setShowEditVaccine(true);
  const handleHide = () => setShowEditVaccine(false);


  const handleVaccineClick = (vaccine) => {
    console.log("VACCINE: ", vaccine);
    setVaccineFields(vaccine);
    handleShow();
  };

  const vaccines = props.pet.vaccines;
  const vaccineItems = vaccines.map((vaccine) =>
    <ListGroup.Item key={vaccine.vaccineId}
                    vaccine={vaccine} action
                    onClick={() => handleVaccineClick(vaccine)}
                    type="button"> {vaccine.name}
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
      <AddVaccineModal
        vaccine={vaccineFields}
        pet={props.pet}
        edit={true}
        showEditVaccine={showEditVaccine}/>
    </div>
  );
}

export default EditVaccinesList;