import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  //null is returned when the app boots up first time, indicating we have no clue whether the user is actually logged in
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}
