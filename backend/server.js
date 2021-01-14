import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Initialise
const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
	res.send('Api is running.......');
});

app.use('/api/products', productRoutes);

//Errorhandling middleware
app.use(errorHandler);
app.use(notFound);
// ------------------------

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
