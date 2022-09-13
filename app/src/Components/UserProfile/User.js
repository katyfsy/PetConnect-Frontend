import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { getUser } from "./userInfo";
import { useNavigate } from 'react-router-dom';

function User() {
  const [form, setForm] = useState({
    username:'',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    userType: 'ORGANIZATION',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    userPhoto: ''
  });

  useEffect(() => {
    const doGetUser = () => {
      // route has to be changed later
      axios.get(`http://a6740867e357340d391ac68d12435ca6-2060668428.us-west-2.elb.amazonaws.com/api/public/user/test2`)
        .then((res) => {
          let result = res.data;
          for(var key in result) {
            if(result[key] === null) {
              result[key] = "";
            }
            if(result.userPhoto === "") {
              result.userPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }
          }
          setForm(result);
        })
        .catch((err) => console.log(err));
      }
    doGetUser();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    if (getUser() === "test2") {
      navigate('/myprofile');
    } else {
      navigate('/profile/test2');
    }
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={form.userPhoto} style={{height: 200}} onClick={() => handleClick()}/>
      <Card.Body>
        <Card.Title>{form.businessName}</Card.Title>
        <Card.Text>{form.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Email: {form.email}</ListGroup.Item>
        <ListGroup.Item>Phone: {form.phone}</ListGroup.Item>
        <ListGroup.Item>City: {form.city} State: {form.state}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href={form.website}>Our website</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default User;