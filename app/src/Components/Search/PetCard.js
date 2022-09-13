import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function PetCard({name, type, gender, age, breed}) {

  return(
    <Card style={{ width: '18rem' }}>
      <Link to="/pets" style={{ textDecoration: 'none', color: 'black' }}>
        <Card.Img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350/100px180" />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {gender}
        </Card.Text>
        <Card.Text>
          {age} * {breed}
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