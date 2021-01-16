import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

//Add to cart functionality after the onclick is fired.
/*W e implemented the getState which helps us get the entire state tree
which we shall use to get the cartItems inside the cart state to save 
it to the local storage */

export const addToCart = (id, quantity) => async (dispatch, getState) => {
	const res = await axios.get(`/api/products/${id}`);
	const data = res.data;
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			quantity: quantity,
		},
	});

	/*We use JSON.stringify to be able to save to LOCAL STORAGE, as
    we can only save strings to local storage and we
	shall use JSON.parse to get it back.*/
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: productId,
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
