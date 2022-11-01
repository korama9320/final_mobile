import { createStore } from "redux";
import mainReducer from "./Reducers/rootReducers";
export const store = createStore(mainReducer);
