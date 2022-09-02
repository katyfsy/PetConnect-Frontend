import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class AddAPetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: null,
      petLocation: null,
      petType: null,
      petDescription: null,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // console.log(event.target.name)
    // console.log(event.target.value)
  }

  handleOnSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="petName"
              className="pet-name"
              type="text"
              placeholder="Pet's Name"
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="petLocation"
              className="pet-location"
              type="text"
              value={this.state.value}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type (Delete later)</Form.Label>
            <Form.Control
              name="petType"
              className="pet-type"
              type="text"
              value={this.state.value}
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="petType"
              className="pet-type"
              onChange={this.handleOnChange}
            >
              <option>Please Select from the list below</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="horse">Horse</option>
              <option value="fish">Fish</option>
              <option value="farmAnimal">Farm Animal</option>
              <option value="smallPet">Small Pet</option>
              <option value="reptile">Reptile</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              className="petDescription"
              name="petDescription"
              as="textarea"
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Button type="submit" className="add-pet-button">
            Add Pet
          </Button>
        </Form>

        <br />
      </>
    );
  }
}
export default AddAPetForm;
