import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MemberForm = ({ values, errors, touched, status }) => {
  // console.log("values", values);
  // console.log("errors", errors);
  // console.log("touched", touched);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);

    status && setMembers(members => [...members, status]);
  }, [status]);
  return (
    <div className="animal-form">
      <Form>
        <label htmlFor="name">
          Name
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="name"
          />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>

        <label htmlFor="email">
          Email
          <Field id="email" type="text" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        <label htmlFor="password">
            password
            <Field
                id='password'
                type='password'
                name='password'
                placeholder='password'
            />
              {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>

        <label htmlFor='role'>
            role
            <Field as="select" className="role-select" name="role">
                <option disabled>Choose an Option</option>
                <option value="placeholder">..........</option>
                <option value="Sheriff">Sherrif</option>
                <option value="Speeder">Speeder</option>
                <option value="Baddie">Baddie</option>
            </Field>
        </label>
        

        <label className="checkbox-container">
          I agree to the Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>

        <Field as="textarea" type="text" name="notes" placeholder="Notes" />
        <button type="submit">Submit!</button>
      </Form>

      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      {members.map(member => {
        return (
          <div key={member.id}>
            <h2>Name: {member.name}</h2>
            <h4>Email: {member.email}</h4>
            <h4>role: {member.role}</h4>
          </div>
        );
      })}
    </div>
  );
};

const FormikMemberForm = withFormik({

  mapPropsToValues(props) {
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      role: props.role || "",
      tos: props.tos || false,
      notes: props.notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required("EMAIL IS MANDATORY"),
    password: Yup.string().required("MUST HAVE STRONG PASSWORD")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        // sends a status update through props in AnimalForm with value as res.data content
        setStatus(res.data);
        //clears form inputs, from FormikBag
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(MemberForm);
export default FormikMemberForm;
