import { combineReducers, legacy_createStore as createStore } from "redux";
import userReducer from "./UserReducer";

const reducers = combineReducers({
  user: userReducer,
});

let store = createStore(reducers);

export default store;
