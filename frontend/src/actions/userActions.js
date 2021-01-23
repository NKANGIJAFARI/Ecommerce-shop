import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
} from '../constants/userConstants';
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

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));

		console.log('This is the row 8data', data);
		console.log('This is the stringifyed data', JSON.stringify(data));
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