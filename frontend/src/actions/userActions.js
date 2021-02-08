import axios from 'axios';
import {
	ORDERS_DELIVER_RESET,
	ORDERS_LIST_CLIENT_RESET,
	ORDER_PAY_RESET,
} from '../constants/orderConstants';
import { PRODUCT_LIST_RESET } from '../constants/productConstants';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_DETAILS_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from '../constants/userConstants';

//====================================================================================
//Login actions
export const Login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'content-Type': 'application/json',
			},
		};

		//change the email to lower case
		const userData = { email, password };
		userData.email = email.toLowerCase();

		const { data } = await axios.post('/api/users/login', userData, config);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Logout actions
export const logout = () => (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDERS_LIST_CLIENT_RESET });
	dispatch({ type: USER_LIST_RESET });
	dispatch({ type: PRODUCT_LIST_RESET });
	dispatch({ type: ORDER_PAY_RESET });
	dispatch({ type: ORDERS_DELIVER_RESET });
	localStorage.removeItem('userInfo');
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Register actions
export const Register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'content-Type': 'application/json',
			},
		};

		//Construct an object to take user info provided
		const userData = { name, email, password };
		userData.email = email.toLowerCase();

		const { data } = await axios.post('/api/users', userData, config);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		//this will login the user immediately after a successfull register
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------s

//====================================================================================
//Get user details actions
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		//Destructure userInfo from the userLogin state
		const {
			userLogin: { userInfo },
		} = getState();

		//Then the config, specify the type of content to send
		//from the body and the token
		const config = {
			headers: {
				'content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the request to the API
		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Update user profile
export const updateUserProfile = ({ id, name, email, password }) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		//Destructure userInfo from the userLogin state
		const {
			userLogin: { userInfo },
		} = getState();

		//Then the config, specify the type of content to send
		//from the body and the token
		const config = {
			headers: {
				'content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Construct an object to take user info provided
		const userData = { id, name, email, password };
		userData.email = email.toLowerCase();
		userData.name = name.toUpperCase();

		//Make the request to the API
		const { data } = await axios.put(`/api/users/profile`, userData, config);

		// dispatch({
		// 	type: USER_LOGIN_SUCCESS,
		// 	payload: data,
		// });
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Update user profile
export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		//Destructure userInfo from the userLogin state
		const {
			userLogin: { userInfo },
		} = getState();

		//Then the config, specify the type of content to send
		//from the body and the token
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the request to the API
		const { data } = await axios.get(`/api/users`, config);

		// dispatch({
		// 	type: USER_LOGIN_SUCCESS,
		// 	payload: data,
		// });
		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});

		// localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Delete users by admin
export const deleteUsers = (userId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		//Destructure userInfo from the userLogin state
		const {
			userLogin: { userInfo },
		} = getState();

		//Then the config, specify the type of content to send
		//from the body and the token
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the request to the API
		await axios.delete(`/api/users/${userId}`, config);

		// dispatch({
		// 	type: USER_LOGIN_SUCCESS,
		// 	payload: data,
		// });
		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------

//====================================================================================
//Delete users by admin
export const updateUser = ({ _id, name, email, isAdmin }) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		//Destructure userInfo from the userLogin state
		const {
			userLogin: { userInfo },
		} = getState();

		//Construct an object to take user info provided
		const userData = { _id, name, email, isAdmin };
		userData.email = email.toLowerCase();
		userData.name = name.toUpperCase();

		//Then the config, specify the type of content to send
		//from the body and the token
		const config = {
			headers: {
				'content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//Make the request to the API
		const { data } = await axios.put(`/api/users/${_id}`, userData, config);

		// dispatch({
		// 	type: USER_LOGIN_SUCCESS,
		// 	payload: data,
		// });
		dispatch({
			type: USER_UPDATE_SUCCESS,
		});

		//To update the user in the sytem/ state, we dispatch user Details also
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
//--------------------------------------------------------------------------------------
