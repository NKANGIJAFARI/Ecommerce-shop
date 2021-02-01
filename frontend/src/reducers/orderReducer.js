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
	ORDER_PAY_RESET,
	ORDERS_LIST_CLIENT_REQUEST,
	ORDERS_LIST_CLIENT_SUCCESS,
	ORDERS_LIST_CLIENT_FAIL,
} from '../constants/orderConstants';

//=========================================================================
//Order Create reducer, used to create or make an order
export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};

		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
//----------------------------------------------------------------------------

//==========================================================================
//Order Details reducer, will be used to get the details of the order

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			};

		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
//---------------------------------------------------------------------------

//==========================================================================
//Order Pay reducer, will be used to get the details of the order payment

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			};
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ORDER_PAY_RESET:
			return {};
		default:
			return state;
	}
};
//-------------------------------------------------------------------------

//==========================================================================
//Order Pay reducer, will be used to get the details of the order payment

export const ordersListClientReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDERS_LIST_CLIENT_REQUEST:
			return {
				loading: true,
			};
		case ORDERS_LIST_CLIENT_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			};
		case ORDERS_LIST_CLIENT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
//-------------------------------------------------------------------------
