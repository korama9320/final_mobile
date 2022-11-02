import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { produceReducer } from "./produceReducer";
import { cartReducer } from "./cartReducer";
import { userReducer } from "./userReducer";
export default combineReducers({
  productReducer,
  produceReducer,
  cartReducer,
  userReducer,
});
