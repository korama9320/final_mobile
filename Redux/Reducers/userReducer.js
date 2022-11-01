import { user } from "../types";

export function userReducer(
  state = {
    user: {
      email: "",
      username: "Abdelrahman Hamdy",
      age: 25,
      weight: 73,
      height: 192,
      gender: "Male",
      fat: 14,
    },
  },
  action
) {
  switch (action.type) {
    case user:
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return { ...state };
  }
}
