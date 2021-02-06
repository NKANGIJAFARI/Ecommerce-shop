import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import products from './data/products.js';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Initialise
const app = express();
dotenv.config();
connectDB();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//Passer to accept parse req.body, allows passing JSON data in body
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Api is running.......');
});

app.use('/api/products', productRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/order', orderRoutes);

app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

//	Making the upload folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
