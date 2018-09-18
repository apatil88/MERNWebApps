import axios from "axios";
import { FETCH_USER } from "./types";

//redux-thunk sees that we return a function. It will automatically call it with the dispatch function.
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res });
};
