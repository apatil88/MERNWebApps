//SurveyField contains logic to render a single label and text input
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  //if touched is true and there is an error message, display the error
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
