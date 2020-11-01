  import {
    SIGNUP,
    LOGIN,
    LOGOUT,
    UPDATE
  } from "../actions/types";
  
  const initialState = {loggedIn: false, user: {}};
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP:
        return {loggedIn: true, user: action.data}
      case LOGIN:
        return {loggedIn: true, user: action.data}
      case LOGOUT:
        return {loggedIn: false, user: {}}
      case UPDATE: 
        return {loggedIn: true, user: action.data}
      default:
        return state;
    }
  };
  
  export default userReducer;