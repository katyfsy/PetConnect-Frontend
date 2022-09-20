import { useNavigate, Link } from "react-router-dom";
import { Card, ListGroup, Col } from "react-bootstrap";

function PetCard({ id, owner, name, zip, type, description, coverPhoto }) {
  const navigate = useNavigate();
  // function  navigateToPetProfile(data.petId);
  const navigateToPetProfile = (id) => {
    // 👇️ navigate to /
    navigate(`/pet/${id}`, { replace: true });
  };
  const handleOnclick = () => {
    navigateToPetProfile(id);
  };
  return (
    <>
    <Col>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={coverPhoto} style={{ height: 200 }} />
        <Card.Body>
          <Card.Title>
            <Card.Link href={`/pet/${id}`}> Name: {name}</Card.Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Type: {type}</ListGroup.Item>
          <ListGroup.Item>Location: {zip}</ListGroup.Item>
          <ListGroup.Item>
            ID: {id} Owner: {owner}
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/`}>Contact My Owner</Card.Link>
        </Card.Body>
      </Card>
      </Col>
      <br />
    </>
  );
}

export default PetCard;
