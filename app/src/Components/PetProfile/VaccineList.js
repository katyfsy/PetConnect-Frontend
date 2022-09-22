import ListGroup from 'react-bootstrap/ListGroup';


const VaccineList = (props) => {

  const vaccines = props.pet.vaccines;
  const vaccineItems = vaccines.map((vaccine) =>
    <ListGroup.Item key={vaccine.vaccineId} > {vaccine.name} </ListGroup.Item>
  )

  if (vaccines.length < 1) {
    return (
      <div>
      <ListGroup>
      <ListGroup.Item > {props.pet.name} has no vaccine history </ListGroup.Item>
      </ListGroup>
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

export default VaccineList;