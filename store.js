import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

// handle resetting the state when user logs out
const appReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const rootReducer = (state, action) => {
//   if (action.type == "LOGOUT") {
//     state = undefined;
//     // handle logout logic and terminate the async 
//   }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)


const configureStore = () => createStore(persistedReducer, applyMiddleware(thunk));
let store = configureStore()
let persistor = persistStore(store)

export { store, persistor }
