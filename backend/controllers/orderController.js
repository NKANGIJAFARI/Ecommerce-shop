import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create New Order
//@Route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400); //Bad request
		throw new Error('No Order items');
	} else {
		//req.user.id is available because this is a protected route

		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		//Save the order to the database
		const createOrder = await order.save();

		//status 201 for something has been created
		res.status(201).json(createOrder);
	}
});

// @desc   	GET Order by ID
//@Route    GET api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
	/* We get the order Id from the url, In frontend whenever the
	order is successful, we redirect by "history.push(/orders/id)" */

	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

// @desc   	GET Order by ID
//@Route    GET api/orders/:id
//@access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	/* We get the order Id from the url, In frontend whenever the
	order is successful, we redirect by "history.push(/orders/id)" */

	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
			purchaseInfo: req.body.purchase_units,
		};

		//Save the order with the updated information, now is paid
		const updatedOrder = await order.save();

		//Receive back the updated order as json info
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

// @desc   	GET looged in user Order by ID
//@Route    GET api/orders/myorders
//@access   Private
const getUserOrders = asyncHandler(async (req, res) => {
	/* We get the orders which has the user same as the logged In user id" */

	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

// @desc   	GET all orders by admin
//@Route    GET api/orders
//@access   Private and only to admin
const getOrders = asyncHandler(async (req, res) => {
	/* We get the orders which has the user same as the logged In user id" */

	const orders = await Order.find({}).populate('user', 'id name');

	res.json(orders);
});
export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getUserOrders,
	getOrders,
};
