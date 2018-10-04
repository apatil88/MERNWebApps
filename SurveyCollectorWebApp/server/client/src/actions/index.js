import axios from "axios";
import { FETCH_USER } from "./types";

//redux-thunk sees that we return a function. It will automatically call it with the dispatch function.
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data }); //Here the res.data contains the User model which contains the Google ID and stripe token
};