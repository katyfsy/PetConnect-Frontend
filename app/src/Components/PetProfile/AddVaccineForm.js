import React, { useState } from "react";
import { FloatingLabel, Button, Form, Container } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddVaccineForm = (props) => {
  const handleOnChange = props.handleOnChange;
  const schema = Yup.object({
    name: Yup.string()
      .required("* Required")
      .max(20, "Must be 20 characters of less"),
    date: Yup.string()
      .max(10, "Must be 10 characters or less"),
    notes: Yup.string()
   });

  return (
    // <Formik
    //   initialValues={{ vaccineName: '', vaccineDate: '', vaccineNotes: '' }}
    //   validationSchema={schema}
    // >
    //   <Form>
    //     <div>
    //       <label htmlFor="vaccineName">Vaccine Name</label><br/>
    //       <Field  className="vaccine-form"
    //               name="name"
    //               type="text"
    //               placeholder="e.g. Parvovirus"
    //               onChange={props.handleOnChange} />
    //               <br/>
    //       <ErrorMessage name="name" />
    //     </div><br/>
    //     <div>
    //       <label htmlFor="dateVaccineAdministered">Date Administered</label><br/>
    //       <Field  className="vaccine-form"
    //               name="date"
    //               type="text"
    //               placeholder="e.g. 01/01/2020"
    //               onChange={props.handleOnChange} />
    //       <ErrorMessage name="date" />
    //     </div>
    //     <br/>
    //     <div>
    //       <label htmlFor="vaccineNotes">Additional Vaccine Notes</label><br/>
    //       <textarea className="vaccine-form"
    //                 name="notes"
    //                 type="text"
    //                 rows="6"
    //                 placeholder="e.g. Need to schedule next series after 3 years"
    //                 onChange={props.handleOnChange} />
    //       <ErrorMessage name="notes" />
    //     </div>
    //   </Form>
    // </Formik>

    <Formik
          validationSchema={schema}
          // validateOnMount
          // setSubmitting={false}
          // onSubmit={console.log("VALUES: ", values)}
          // validateOnChange={false}
          // validateOnBlur={true}
          // setTouched={false}
          initialValues={{
            vaccineName: "",
            vaccineDate: "",
            vaccineNotes: ""
          }}
          // validate
          // errors={{
          //   name: "",
          //   city: "",
          //   state: "",
          //   zip: "",
          //   type: "",
          //   sex: "",
          //   description: "",
          //   // photos: "",
          // }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              className="add-vaccine-form"
              onSubmit={(e) => {
                if (isValid === false) {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAlert(true);
                  setAlertTitle("Incomplete form");
                  setAlertText("Fill out required fields");
                  setAlertType("error");
                  setHandleOnExited(false);
                } else {
                  handleSubmit(e);
                }
              }}
            >
              <Form.Group
                className="add-vaccine-form-field"
                controlId="nameValidation"
              >
                <Form.Label>Vaccine Name</Form.Label>
                <Form.Control
                  className="pet-name form-input"
                  type="text"
                  name="vaccineName"
                  value={values.vaccineName}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e);
                  }}
                  placeholder="e.g. Parvovirus"
                  isInvalid={errors.vaccineName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.vaccineName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="add-vaccine-form-field"
                controlId="nameValidation"
              >
                <Form.Label>Date Administered</Form.Label>
                <Form.Control
                  className="pet-name form-input"
                  type="text"
                  name="date"
                  value={values.vaccineDate}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e);
                  }}
                  placeholder="e.g. 01/01/2020"
                  isInvalid={errors.vaccineDate}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.vaccineDate}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="add-vaccine-form-field"
                controlId="nameValidation"
              >
                <Form.Label> Vaccine Notes</Form.Label>
                <Form.Control
                  className="pet-name form-input"
                  as="textarea"
                  name="notes"
                  value={values.vaccineNotes}
                  onChange={(e) => {
                    handleChange(e);
                    handleOnChange(e);
                  }}
                  placeholder="e.g. Need to schedule next series after 3 years"
                  isInvalid={errors.vaccineNotes}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback className="form-error" type="invalid">
                  {errors.vaccineNotes}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="mb-3 buttons-form-container">
                {/* <Form.Group className="mb-3">
                  <Button
                    bsPrefix="cancel-pet-button"
                    variant="secondary"
                    type="submit"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Form.Group> */}

                {/* <Form.Group className="mb-3">
                  {isClicked ? null : (
                    <Button bsPrefix="add-pet-button" type="submit">
                      Add Pet
                    </Button>
                  )}
                </Form.Group> */}
              </div>
            </Form>
          )}
        </Formik>
  );
};

export default AddVaccineForm;