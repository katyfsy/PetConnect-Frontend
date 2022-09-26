import ListGroup from "react-bootstrap/ListGroup";
import React, { useState } from "react";
import AddVaccineModal from "./AddVaccineModal.js";

const EditVaccinesList = (props) => {
  const [showEditVaccine, setShowEditVaccine] = useState(false);
  const [vaccineFields, setVaccineFields] = useState({
    name: null,
    date: null,
    notes: null,
    key: Math.random(),
  });

  const handleShow = () => setShowEditVaccine(true);
  const handleHide = () => setShowEditVaccine(false);
  // console.log(vaccineFields);
  const handleVaccineClick = (vaccine) => {
    console.log("VACCINE: ", vaccine);
    setVaccineFields(vaccine);
    handleShow();
  };

  const vaccineItems = props.vaccineList.map((vaccine) => (
    <ListGroup.Item
      key={vaccine.vaccineId}
      vaccine={vaccine}
      action
      onClick={() => handleVaccineClick(vaccine)}
      type="button"
    >
      {" "}
      {vaccine.name}
      <div className="edit-vaccine-date"> {vaccine.date} </div>
    </ListGroup.Item>
  ));

  if (props.vaccineList.length < 1) {
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            {" "}
            {props.petName} has no vaccine history{" "}
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }

  return (
    <div>
      <AddVaccineModal
        vaccine={vaccineFields}
        // pet={props.pet}
        edit={true}
        showVaccineForm={showEditVaccine}
        setShowVaccineForm={setShowEditVaccine}
        vaccineList={props.vaccineList}
        handleEditVaccineInList={props.handleEditVaccineInList}
        setVaccineFields={setVaccineFields}
      />
      <ListGroup>{vaccineItems}</ListGroup>
    </div>
  );
};

export default EditVaccinesList;
