import axios from 'axios';

import {
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

//This is an action that will go to the database to fetch the products
//We are to use the redux thunk, it allows us to have a
// function inside a function to easily handle aync

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const res = await axios.get('/api/products');

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const res = await axios.get(`/api/products/${id}`);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//===========================================================================
//Get all the  order list of the client side

export const deleteProducts = (productId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		});

		/*Destructure userInfo from the userLogin state so that we get 
        the token from that user info */
		const {
			userLogin: { userInfo },
		} = getState();

		//Then the config, specify the type of content to send
		//from the body and the token because its a protected route at the backend
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the put request to the order API
		await axios.delete(`/api/products/${productId}`, config);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------
