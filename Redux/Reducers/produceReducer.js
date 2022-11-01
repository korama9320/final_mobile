import { produce } from "../types";

export function produceReducer(state = { produce: [] }, action) {
  switch (action.type) {
    case produce:
      return { ...state, produce: [...action.payload] };
    default:
      return { ...state };
  }
}
