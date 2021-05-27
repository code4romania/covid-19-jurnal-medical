import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./ducks/user";

const rootReducer = combineReducers({ user });
const store = createStore(rootReducer, composeWithDevTools());

export default store;
