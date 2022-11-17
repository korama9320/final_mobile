import { addToCart, increment, decrement, checkout, cart } from "../types";

export function cartReducer(state = { cart: [] }, action) {
  switch (action.type) {
    case addToCart:
      {
        let c = state.cart.filter(
          (item) => item.title === action.payload.title
        );

        if (c.length === 0) {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, count: 1 }],
          };
        }
      }
      break;
    case increment: {
      let x = state.cart.filter((item) => item.title === action.payload.title);
      let y = state.cart.filter((item) => item.title !== action.payload.title);
      let index = state.cart.findIndex(
        (item) => item.title === action.payload.title
      );
      if (x[0].quantity <= x[0].count) {
        return { ...state, cart: [{ ...x[0], count: x[0].quantity }, ...y] };
      } else {
        return {
          ...state,
          cart: [
            ...y.splice(0, index),
            { ...x[0], count: x[0].count + 1 },
            ...y,
          ],
        };
      }
    }

    case decrement: {
      let x = state.cart.filter((item) => item.title === action.payload.title);
      let y = state.cart.filter((item) => item.title !== action.payload.title);
      let index = state.cart.findIndex(
        (item) => item.title === action.payload.title
      );
      // let z = y.splice(index, 0, ...x);
      if (x[0].count <= 1) {
        console.log(1);
        return { ...state, cart: [...y] };
      } else {
        return {
          ...state,
          cart: [
            ...y.splice(0, index),
            { ...x[0], count: x[0].count - 1 },
            ...y,
          ],
        };
      }
    }
    case checkout: {
      return { ...state, cart: [] };
    }

    case cart: {
      return { ...state, cart: [...action.payload] };
    }
    default:
      return { ...state };
  }
}
