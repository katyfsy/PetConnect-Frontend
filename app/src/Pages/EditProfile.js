import './EditProfile.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../Components/Default/Navbar';
import Header from '../Components/Default/Header';
import { Container, Row, Button, Form, Col, Image } from 'react-bootstrap';
// import getUser from '../Components/UserProfile/DummyData';
import axios from 'axios';
import DeleteBtn from '../Components/UserProfile/DeleteBtn';
import { getBearerToken, getUser } from "../Components/UserProfile/userInfo.js"

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
    userPhoto: ''
  });

  const [userPhoto, setUserPhoto] =useState('');

  const [validated, setValidated] = useState(false);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  // function getToken() {
  //   const tokenString = localStorage.getItem('token');
  //   //This can be deleted once profile page is functional.
  //   if (tokenString === "") {
  //     return;
  //   }
  //   const userToken = JSON.parse(tokenString);
  //   return userToken;
  // }

  useEffect(() => {
    const doGetUser = () => {
      axios.get(`http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/user/${getUser()}`,
      {headers: {
        'Authorization': getBearerToken()
      }})
        .then((res) => {
          console.log(res)
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
          setUserPhoto(result.userPhoto);
        });
      // using local dummy data
      // const result = getUser();
      // setForm(result);
      // setUserPhoto(result.userPhoto);
    }
    doGetUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const submitButton = (e) => {
    const submitForm = e.currentTarget;
    if (submitForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      form.userPhoto = userPhoto;
      console.log(form);
      axios.patch(`http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/user/${getUser()}`, form, {
        headers: {
          'Authorization': getBearerToken()
        }
      })
        .then(() => {
          navigate('/profile');
        })
        .catch((err) => console.log("patch error", err))
    }
      setValidated(true);
  }

  const handleUploadButton = () => {
    inputRef.current?.click();
  }

  const handleUploadToS3 = (event) => {
    event.preventDefault();
    const file = inputRef.current.files[0];
    // get presigned url from backend server
    axios.get("http://a414ee7644d24448191aacdd7f94ef18-1719629393.us-west-2.elb.amazonaws.com/api/upload",
      {headers: {
        'Authorization': getBearerToken()
      }})
        .then((res) => {
          console.log("S3 presigned URL for saving file", res.data);
          const imageUrl = res.data.split("?")[0];
          //post the image to  s3 bucket
          axios.put(res.data, file,
            {headers: {
              "Content-Type": "application/octet-stream"
            }
          })
          .then(() => {
            //read the image from s3 bucket
            console.log("S3 presigned URL for reading file", imageUrl);
            setUserPhoto(imageUrl);
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
        })
  }

  if(form.userType === "USER") {
    return (
      <div>
        <Container>
          <Header/>
        </Container>
        <Navigationbar/>
        <Container className="edit-form">
          <h1>Edit your profile</h1>
          <Image src={userPhoto} roundedCircle className="profile-photo"/>
          <div className="upload-button">
            <input ref={inputRef} onChange={handleUploadToS3} className="d-none" type="file" accept="image/*"/>
            <Button variant="primary" size="sm" onClick={handleUploadButton}>Upload your picture</Button>
          </div>
          <Form className="container mt-3 mb-3" noValidate validated={validated} onSubmit={submitButton}>
            <Row className="mb-3">
              <Form.Group className="col col-sm-6" controlId="firstName">
                <Form.Label className="required-field">First Name</Form.Label>
                <Form.Control required type="text" name="firstName" value={form.firstName} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a first name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="col col-sm-6" controlId="lastName">
                <Form.Label className="required-field">Last Name</Form.Label>
                <Form.Control required type="text" name="lastName" value={form.lastName} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className="col col-sm-6" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={form.phone} onChange={handleChange}/>
              </Form.Group>
              <Form.Group className="col col-sm-6" controlId="email">
                <Form.Label className="required-field">Email</Form.Label>
                <Form.Control required type="email" name="email" value={form.email} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a email.
                </Form.Control.Feedback>
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
                  <option></option>
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
                <Form.Label className="required-field">ZIP Code</Form.Label>
                <Form.Control required type="text" name="zipCode" value={form.zipCode} onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a ZIP code.
                </Form.Control.Feedback>
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
         </Form>
         <div align="end"><DeleteBtn /></div>
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
        <h1>Edit your profile</h1>
        <Image src={userPhoto} roundedCircle className="profile-photo"/>
        <div className="upload-button">
          <input ref={inputRef} onChange={handleUploadToS3} className="d-none" type="file" />
          <Button variant="primary" size="sm" onClick={handleUploadButton}>Upload your picture</Button>
        </div>
        <Form className="container mt-3 mb-3" noValidate validated={validated} onSubmit={submitButton}>
          <Row className="mb-3">
            <Form.Group className="col col-sm-6" controlId="businessName">
              <Form.Label className="required-field">Business Name </Form.Label>
              <Form.Control required type="text" name="businessName" value={form.businessName} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a business name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col col-sm-6" controlId="website">
              <Form.Label className="required-field">Business Website</Form.Label>
              <Form.Control required type="text" name="website" value={form.website} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a business website.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="col col-sm-6" controlId="phone">
              <Form.Label className="required-field">Phone</Form.Label>
              <Form.Control required type="text" name="phone" value={form.phone} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide business phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col col-sm-6" controlId="email">
              <Form.Label className="required-field">Email</Form.Label>
              <Form.Control required type="text" name="email" value={form.email} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a business email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group className="col col-sm-6" controlId="address">
              <Form.Label className="required-field">Address</Form.Label>
              <Form.Control required type="text" name="address" value={form.address} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a business address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="city">
              <Form.Label className="required-field">City</Form.Label>
              <Form.Control required type="text" name="city" value={form.city} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="state">
              <Form.Label className="required-field">State</Form.Label>
              <Form.Select required name="state" value={form.state} onChange={handleChange}>
                <option></option>
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
              <Form.Control.Feedback type="invalid">
                Please select a state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="zipCode">
              <Form.Label className="required-field">ZIP Code</Form.Label>
              <Form.Control required type="text" name="zipCode" value={form.zipCode} onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid ZIP code.
              </Form.Control.Feedback>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div align="end"><DeleteBtn /></div>
      </Container>
    </div>
    )
  }
}

export default EditProfile;