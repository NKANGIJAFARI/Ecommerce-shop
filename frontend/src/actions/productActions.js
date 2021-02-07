import axios from 'axios';

import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

//This is an action that will go to the database to fetch the products
//We are to use the redux thunk, it allows us to have a
// function inside a function to easily handle aync

export const listProducts = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const res = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		);

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

export const listTopRatedProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_TOP_REQUEST });

		const { data } = await axios.get(`/api/products/top`);

		console.log('data', data);
		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
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
//Delete a product functionality

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

//===========================================================================
//Create a new product functionality

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
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
		const { data } = await axios.post(`/api/products`, {}, config);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------

//===========================================================================
//Update a new product functionality

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		console.log(product);

		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
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
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the put request to the order API
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------

//===========================================================================
//Create a product review functionality

export const createProductReview = (productId, reviewDetails) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
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
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the put request to the order API
		const { data } = await axios.post(
			`/api/products/${productId}/reviews`,
			reviewDetails,
			config
		);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
			payload: data,
			//rECEIVE THE MESSAGE IN THE PAYLOAD AND SHOW IT TO THE USER
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------
