import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
// import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';



function PetCard() {

  return(
    <Card style={{ width: '18rem' }}>
    {/* <Card> */}
      <Card.Img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350/100px180" />
      <Card.Body>
        <Card.Title>CICI</Card.Title>
        <Card.Text>
          female
        </Card.Text>
        <Card.Text>
          young * ragdoll
        </Card.Text>
        <Card.Text>
          Rescued by Humane Society
        </Card.Text>
        <Button variant="primary">Favorite</Button>
      </Card.Body>
    </Card>
  )

}

export default PetCard;