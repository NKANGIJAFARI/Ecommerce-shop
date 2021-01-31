import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	//Get items from the orderDetails
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	useEffect(() => {
		if (!order || order._id !== orderId) {
			dispatch(getOrderDetails(orderId));
		}
		// eslint-disable-next-line
	}, [order, orderId]);

	//========================================================================================

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					{' '}
					<h2>Order ID: {order._id}</h2>
					<Row>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>Shipping Details</h3>
									<span>
										<strong>Name: </strong> {order.user.name}{' '}
									</span>
									<br />
									<strong>Email: </strong>
									<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
									<p>
										<strong>Address: </strong>
										{order.shippingAddress.address},{order.shippingAddress.city}
										,{order.shippingAddress.postalCode},
										{order.shippingAddress.counrty}
									</p>
									{/* Lets check to see the order delivery status*/}
									{order.isPaid ? (
										order.isDelivered ? (
											<Message variant='success'>
												Delivered on {order.deliveredAt}
											</Message>
										) : (
											<Message variant='danger'>Not Delivered</Message>
										)
									) : null}
								</ListGroup.Item>
								<ListGroup.Item>
									<h3>Payment Method</h3>
									{order.paymentMethod}
									{/* Lets check to see the order status (paid, not, delivered) */}
									{order.isPaid ? (
										<Message variant='success'>Paid On {order.paidAt}</Message>
									) : (
										<Message variant='danger'>Not Paid</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{order.orderItems.length === 0 ? (
										<Message>Your order is Empty</Message>
									) : (
										<ListGroup>
											{order.orderItems.map((item, index) => (
												<ListGroup.Item key={index}>
													<Row>
														<Col md={1}>
															<Image
																src={item.image}
																alt={item.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link to={`/products/${item.product}`}>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.quantity} x ${item.price} = $
															{item.quantity * item.price}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Items Price</Col>
											<Col>$ {order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>$ {order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Shipping Costs</Col>
											<Col>$ {order.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>$ {order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										{error && <Message variant='danger'>{error}</Message>}
									</ListGroup.Item>
									<ListGroup.Item>
										<Button
											type='button'
											className='btn-block'
											disabled={order.orderItems === 0}>
											PLACE ORDER
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
