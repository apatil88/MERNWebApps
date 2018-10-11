//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  {
    label: "Survey Title",
    name: "title",
    noValueError: "You must provide a title"
  },
  {
    label: "Subject Line",
    name: "subject",
    noValueError: "You must provide a subject"
  },
  {
    label: "Email Body",
    name: "body",
    noValueError: "You must provide an email"
  },
  {
    label: "Recipient List",
    name: "emails",
    noValueError: "You must provide a recipient"
  }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || "");

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  /*if (!values.title) {
    errors.title = "You must provide a title"; //Redux Form will pass this to the Field with the name="title" as props. This error message will be available on props.meta.error.
  }*/

  return errors; //If the errors object is empty, Redux Form assumes the entire form is valid.
}

export default reduxForm({
  validate: validate, //this function is run automatically when the user submits the form
  form: "surveyForm"
})(SurveyForm);
