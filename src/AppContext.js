import { createContext } from 'react';

const initialState = {
  git: null,
  sha: '',
  products: [],
  categories: [],
  events: [],
  attributes: []
};

const actionTypes = {
  SET_GIT_CREDENTIALS: "SET_GIT_CREDENTIALS",
  GET_CATALOG: "GET_CATALOG",
  UPDATE_PRODUCT: "UPDATE_PRODUCT"
};

const AppContext = createContext(initialState);

export { AppContext };
export { initialState };
export { actionTypes };


