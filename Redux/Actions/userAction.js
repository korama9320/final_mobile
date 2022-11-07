import { user } from "../types";
export function setuser(data) {
  return {
    type: user,
    payload: data,
  };
}
