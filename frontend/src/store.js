import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { UserReducer } from "./store/UserReducer";
const rootReducer = combineReducers({
  UserReducer
});
const store = createStore(rootReducer, composeWithDevTools());

export { store };
