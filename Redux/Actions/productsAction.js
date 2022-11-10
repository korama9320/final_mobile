import {
  products,
  produce,
  pagenate,
  addToCart,
  increment,
  decrement,
  checkout,
  cart,
} from "../types";

export function setProducts(data) {
  return {
    type: products,
    payload: data,
  };
}

export function setProduce(data) {
  return {
    type: produce,
    payload: data,
  };
}
export function setPagenate(data) {
  return {
    type: pagenate,
    payload: data,
  };
}

export function addtoCart(data) {
  return {
    type: addToCart,
    payload: data,
  };
}
export function incount(data) {
  return {
    type: increment,
    payload: data,
  };
}
export function decount(data) {
  return {
    type: decrement,
    payload: data,
  };
}

export function checkoutt() {
  return {
    type: checkout,
  };
}

export function setcart(data) {
  return {
    type: cart,
    payload: data,
  };
}
