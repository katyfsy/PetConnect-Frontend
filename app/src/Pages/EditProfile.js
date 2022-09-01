import './EditProfile.css';
import React, { useState, useEffect } from 'react';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import getUser from '../Components/UserProfile/DummyData';

function EditProfile() {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    userType: 'individual',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    photo: ''
  });

  useEffect(() => {
    const doGetUser = async () => {
      const result = await getUser();
      setForm(result);
    }
    doGetUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const submitButton = (e) => {
    e.preventDefault();
    console.log(form);
  }

  if(form.userType === "individual") {
    return (
      <div>
        <Container>
          <Header/>
        </Container>
        <Navigationbar/>
        <Container className="edit-form">
            <Form className="container mt-3 mb-3">
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="col col-sm-6" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" value={form.lastName} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="col col-sm-6" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email" value={form.email} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="website">
                  <Form.Label>Personal Link</Form.Label>
                  <Form.Control type="text" name="website" value={form.website} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={form.address} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={form.city} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Select name="state" value={form.state} onChange={handleChange}>
                    <option>AL</option>
                    <option>AK</option>
                    <option>AZ</option>
                    <option>AR</option>
                    <option>CA</option>
                    <option>CO</option>
                    <option>CT</option>
                    <option>DE</option>
                    <option>DC</option>
                    <option>FL</option>
                    <option>GA</option>
                    <option>HI</option>
                    <option>ID</option>
                    <option>IL</option>
                    <option>IN</option>
                    <option>IA</option>
                    <option>KS</option>
                    <option>KY</option>
                    <option>LA</option>
                    <option>ME</option>
                    <option>MD</option>
                    <option>MA</option>
                    <option>MI</option>
                    <option>MN</option>
                    <option>MS</option>
                    <option>MO</option>
                    <option>MT</option>
                    <option>NE</option>
                    <option>NV</option>
                    <option>NH</option>
                    <option>NJ</option>
                    <option>NM</option>
                    <option>NY</option>
                    <option>NC</option>
                    <option>ND</option>
                    <option>OH</option>
                    <option>OK</option>
                    <option>OR</option>
                    <option>PA</option>
                    <option>RI</option>
                    <option>SC</option>
                    <option>SD</option>
                    <option>TN</option>
                    <option>TX</option>
                    <option>UT</option>
                    <option>VT</option>
                    <option>VA</option>
                    <option>WA</option>
                    <option>WV</option>
                    <option>WI</option>
                    <option>WY</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="zipCode">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control type="text" name="zipCode" value={form.zipCode} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit" href="/profile">
                Cancel
              </Button>
              {" "}
              <Button variant="primary" type="submit" onClick={submitButton}>
                Submit
              </Button>
            </Form>
        </Container>
      </div>
    )
  } else {
    return (
      <div>
        <Container>
          <Header/>
        </Container>
        <Navigationbar/>
        <Container className="edit-form">
            <Form className="container mt-3 mb-3">
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="businessName">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control type="text" name="businessName" value={form.businessName} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="col col-sm-6" controlId="website">
                  <Form.Label>Business Website</Form.Label>
                  <Form.Control type="text" name="website" value={form.website} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="col col-sm-6" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="email" value={form.email} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col col-sm-6" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={form.address} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={form.city} onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Select name="state" value={form.state} onChange={handleChange}>
                    <option>AL</option>
                    <option>AK</option>
                    <option>AZ</option>
                    <option>AR</option>
                    <option>CA</option>
                    <option>CO</option>
                    <option>CT</option>
                    <option>DE</option>
                    <option>DC</option>
                    <option>FL</option>
                    <option>GA</option>
                    <option>HI</option>
                    <option>ID</option>
                    <option>IL</option>
                    <option>IN</option>
                    <option>IA</option>
                    <option>KS</option>
                    <option>KY</option>
                    <option>LA</option>
                    <option>ME</option>
                    <option>MD</option>
                    <option>MA</option>
                    <option>MI</option>
                    <option>MN</option>
                    <option>MS</option>
                    <option>MO</option>
                    <option>MT</option>
                    <option>NE</option>
                    <option>NV</option>
                    <option>NH</option>
                    <option>NJ</option>
                    <option>NM</option>
                    <option>NY</option>
                    <option>NC</option>
                    <option>ND</option>
                    <option>OH</option>
                    <option>OK</option>
                    <option>OR</option>
                    <option>PA</option>
                    <option>RI</option>
                    <option>SC</option>
                    <option>SD</option>
                    <option>TN</option>
                    <option>TX</option>
                    <option>UT</option>
                    <option>VT</option>
                    <option>VA</option>
                    <option>WA</option>
                    <option>WV</option>
                    <option>WI</option>
                    <option>WY</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="zipCode">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control type="text" name="zipCode" value={form.zipCode} onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit" href="/profile">
                Cancel
              </Button>
              {" "}
              <Button variant="primary" type="submit" onClick={submitButton}>
                Submit
              </Button>
            </Form>
        </Container>
      </div>
    )
  }
}

export default EditProfile;