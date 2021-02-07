import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import Reducers below
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productCreateReviewReducer,
	productTopRatedReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from './reducers/userReducers';

import {
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderPayReducer,
	ordersListClientReducer,
	ordersListReducer,
} from './reducers/orderReducer';

//-------------------------------------------
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	productTopRated: productTopRatedReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	ordersList: ordersListReducer,
	ordersListClient: ordersListClientReducer,
});

//Check if there are cart items in the local storage.
const cartItemsFromLStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

//Check if there are user Info in the local storage.
const userInfoFromLStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

//Check if there are user Info in the local storage.
const shippingAddressFromLStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

//The initial state will be the data in the local storage
const initialState = {
	cart: {
		cartItems: cartItemsFromLStorage,
		shippingAddress: shippingAddressFromLStorage,
	},
	userLogin: { userInfo: userInfoFromLStorage },
	userRegister: { userInfo: userInfoFromLStorage },
};

//Initialise the store
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
