import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { produceReducer } from "./produceReducer";
import { pagenateReducer } from "./pagenateReducer";
import { cartReducer } from "./cartReducer";
import { userReducer } from "./userReducer";
export default combineReducers({
  productReducer,
  produceReducer,
  pagenateReducer,
  cartReducer,
  userReducer,
});
