import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

// handle resetting the state when user logs out
const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
//   if (action.type == "LOGOUT") {
//     state = undefined;
//     // handle logout logic and terminate the async 
//   }
  return appReducer(state, action);
};

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;