import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import Reducers below
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

//-------------------------------------------

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
});

const cartItemsFromLStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromLStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('cartItems'))
	: null;

const initialState = {
	cart: { cartItems: cartItemsFromLStorage },
	userLogin: { userInfo: userInfoFromLStorage },
};

//Initialise the store
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;