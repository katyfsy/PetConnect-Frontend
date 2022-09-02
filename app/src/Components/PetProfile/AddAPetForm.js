import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class AddAPetForm extends Component {

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
        </Form>

        <br />
      </>
    );
  }
}
export default AddAPetForm;
