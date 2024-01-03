import { SET_DATA_WISHLIST } from "./actions"

const initialState = {
  wishlist: {},
}

export const wishlistData = (state = initialState, action: any) => {
  const { type, payload } = action

  switch (type) {
      case SET_DATA_WISHLIST:
          return {
            ...state,
            wishlist: payload
          }
      default:
          return state
  }
}