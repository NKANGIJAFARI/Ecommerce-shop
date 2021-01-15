import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match, history }) => {
	// Use a component state to handle the number of product in the stock
	const [quantity, setQuantity] = useState(1);
	// -------------------------------------

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);

	const { product, error, loading } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [match.params.id]);

	//Add to cart handler will manager the ad to cart button

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	/*
	Explanation:
	history.push(path, [state]) - (function) 
	Pushes a new entry onto the history stack
	*/

	//-------------------------------------------------------//
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'> {error} </Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}></Rating>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: ${product.description}{' '}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{
									//Check if the product is in stock to show its quantity slector
									product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty: </Col>
												<Col>
													<Form.Control
														as='select'
														value={quantity}
														onChange={(e) => setQuantity(e.target.value)}>
														{
															//Get the number of pro
															[...Array(product.countInStock).keys()].map(
																(x) => (
																	<option key={x + 1} value={x + 1}>
																		{' '}
																		{x + 1}{' '}
																	</option>
																)
															)
														}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)
								}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
										disabled={product.countInStock === 0}>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
