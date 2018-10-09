import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm //Redux Form assumes all of its state lives in the 'form' key
});
