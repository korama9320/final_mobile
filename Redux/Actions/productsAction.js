import {
  products,
  produce,
  pagenate,
  addToCart,
  increment,
  decrement,
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
