import { SET_DATA_CART } from "../cart/actions"

const initialState = {
  cart: {
    items: []
  },
}

export const cartData = (state = initialState, action: any) => {
  const { type, payload } = action

  switch (type) {
      case SET_DATA_CART:
          return {
            ...state,
            cart: payload
          }
      default:
          return state
  }
}