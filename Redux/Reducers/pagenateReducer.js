import { pagenate } from "../types";

export function pagenateReducer(state = { pagenate: {} }, action) {
  switch (action.type) {
    case pagenate:
      return { ...state, pagenate: { ...state.pagenate, ...action.payload } };
    default:
      return { ...state };
  }
}
