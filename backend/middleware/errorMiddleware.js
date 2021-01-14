const errorHandler = (err, req, res, next) => {
	//Sometimes it broings an error but still with 200 as status code,
	//Now we need to check if error occurs and the status is 200, we make it 500
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};

//Whenever there is a request to a not available Api, this
//function will handle that.
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? null : error.stack,
	});
	next(error);
};

export { notFound, errorHandler };
