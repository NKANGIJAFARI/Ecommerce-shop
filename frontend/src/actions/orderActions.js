import axios from 'axios';

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDERS_LIST_CLIENT_REQUEST,
	ORDERS_LIST_CLIENT_SUCCESS,
	ORDERS_LIST_CLIENT_FAIL,
} from '../constants/orderConstants';

//===========================================================================
//Create Order action/ functionality
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
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
				'content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the post request to the order API
		const { data } = await axios.post('/api/order', order, config);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------

//===========================================================================
//Get the Order Details action/ functionality

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
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

		//Make the post request to the order API
		const { data } = await axios.get(`/api/order/${orderId}`, config);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------

//===========================================================================
//Pay order functionality

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
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
				'content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the put request to the order API
		const { data } = await axios.put(
			`/api/order/${orderId}/pay`,
			paymentResult,
			config
		);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------

//===========================================================================
//Get all the  order list of the client side

export const listClientOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDERS_LIST_CLIENT_REQUEST,
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
		const { data } = await axios.get(`/api/order/myorders`, config);

		//If the post request is successful, data will be filled with the response
		dispatch({
			type: ORDERS_LIST_CLIENT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		//When the post request fails, we shall dispatch failure
		dispatch({
			type: ORDERS_LIST_CLIENT_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//-------------------------------------------------------------------------------
