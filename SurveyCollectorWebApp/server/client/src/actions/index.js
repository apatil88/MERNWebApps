import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  //redux-thunk sees that we return a function. It will automatically call it with the dispatch function.
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
