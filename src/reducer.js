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

    case actionTypes.CREATE_OR_UPDATE_PRODUCT:
      const existingProduct = state.products.find(product => product.id === payload.id);
      const products = (existingProduct)
        ? state.products.map(product => (product.id !== payload.id) ? product : payload)
        : [...state.products, payload]

        return {
        ...state,
        products
      }

      case actionTypes.DELETE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(product => product.id !== payload.id)
        }

    default:
      return state;
  }
}
