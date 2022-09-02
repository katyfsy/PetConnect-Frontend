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
        </Form>

        <br />
      </>
    );
  }
}
export default AddAPetForm;
