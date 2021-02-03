import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

// @desc    Fetch all products
//@Route     Get /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc    Fetch single products
//@Route     Get /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Delete a product
//@Route     DELETE /api/products/:id
//@access   Private and only for admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product has been removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

export { getProducts, getProductById, deleteProduct };
