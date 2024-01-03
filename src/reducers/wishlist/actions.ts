export const SET_DATA_WISHLIST = 'SET_DATA_WISHLIST';

export const setDataWishlist = (data: any) => {
	return {
		type: SET_DATA_WISHLIST,
		payload: data
	}
}