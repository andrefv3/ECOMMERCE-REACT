export const SET_DATA_CART = 'SET_DATA_CART';

export const setDataCart = (data: any) => {
	return {
		type: SET_DATA_CART,
		payload: data
	}
}