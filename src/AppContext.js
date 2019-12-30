import { createContext } from 'react';

const initialState = {
  sha: '',
  products: [],
  categories: [],
  events: [],
  attributes: []
};

const actionTypes = {
  GET_CATALOG: "GET_CATALOG",
  UPDATE_PRODUCT: "UPDATE_PRODUCT"
};

const AppContext = createContext(initialState);

export { AppContext };
export { initialState };
export { actionTypes };


