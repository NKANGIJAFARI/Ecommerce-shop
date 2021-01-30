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

export { addOrderItems };
