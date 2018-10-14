//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
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

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({ name, noValueError }) => {
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
  form: "surveyForm", //Tells Redux Form how to manage values for this form inside of the reducer. values will be available on the state object as state.form.surveyForm.values
  destroyOnUnmount: false //Persist form values
})(SurveyForm);
