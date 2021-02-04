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
//@Route    DELETE /api/products/:id
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

// @desc    Create a product
//@Route    POST /api/products
//@access   Private and only for admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		Price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		category: 'Sample Category',
		brand: 'sample brand',
		countInStock: 0,
		numReviews: 0,
		description: 'sample description',
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @desc    Update a product
//@Route    PUT /api/products
//@access   Private and only for admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		category,
		brand,
		countInStock,
		numReviews,
		description,
	} = req.body;

	//Find the product to be edited
	const product = await Product.findById(req.params.id);

	if (product) {
		(product.name = name),
			(product.price = price),
			(product.description = description),
			(product.image = image),
			(product.brand = brand),
			(product.category = category),
			(product.countInStock = countInStock);

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
};
