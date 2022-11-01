import { products } from "../types";

export function productReducer(state = { products: [] }, action) {
  switch (action.type) {
    case products:
      return { ...state, products: [...action.payload] };
    default:
      return { ...state };
  }
}
