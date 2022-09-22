import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddVaccineForm = (props) => {

  const schema = Yup.object({
    name: Yup.string()
      .required("* Required")
      .max(20, "Must be 20 characters of less"),
    date: Yup.string()
      .max(10, "Must be 10 characters or less"),
    notes: Yup.string()
   });

  return (
    <Formik
      initialValues={{ vaccineName: '', vaccineDate: '', vaccineNotes: '' }}
      validationSchema={schema}
    >
      <Form>
        <div>
          <label htmlFor="vaccineName">Vaccine Name</label><br/>
          <Field  className="vaccine-form"
                  name="name"
                  type="text"
                  placeholder="e.g. Parvovirus"
                  onChange={props.handleOnChange} />
                  <br/>
          <ErrorMessage name="name" />
        </div><br/>
        <div>
          <label htmlFor="dateVaccineAdministered">Date Administered</label><br/>
          <Field  className="vaccine-form"
                  name="date"
                  type="text"
                  placeholder="e.g. 01/01/2020"
                  onChange={props.handleOnChange} />
          <ErrorMessage name="date" />
        </div>
        <br/>
        <div>
          <label htmlFor="vaccineNotes">Additional Vaccine Notes</label><br/>
          <textarea className="vaccine-form"
                    name="notes"
                    type="text"
                    rows="6"
                    placeholder="e.g. Need to schedule next series after 3 years"
                    onChange={props.handleOnChange} />
          <ErrorMessage name="notes" />
        </div>
      </Form>
    </Formik>
  );
};

export default AddVaccineForm;