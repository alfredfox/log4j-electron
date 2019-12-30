import { actionTypes } from './AppContext';

export const reducer = (state, action) => {

  const { type, payload } = action;

  switch (type) {

    case actionTypes.SET_GIT_CREDENTIALS:
      return {
        ...state,
        git: payload
      }

    case actionTypes.GET_CATALOG:
      return {
        ...state,
        ...payload
      }

    case actionTypes.UPDATE_PRODUCT:

      const products = state.products.map(item => (item.id !== payload.id) ? item : payload)

      return {
        ...state,
        products
      }

    default:
      return state;
  }
}
