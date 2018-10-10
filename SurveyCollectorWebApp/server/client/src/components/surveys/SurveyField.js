//SurveyField contains logic to render a single label and text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  //if touched is true and there is an error message, display the error
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      {touched && error}
    </div>
  );
};
