import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	deliverOrder,
	getOrderDetails,
	payOrder,
} from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
	ORDER_PAY_RESET,
	ORDERS_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
	//Get the order Id from the url
	const orderId = match.params.id;

	const dispatch = useDispatch();

	//State to change when we receive the SDK from payPal
	const [sdkReady, setSDKReady] = useState(false);

	//Get items from the orderPay state **************************
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	//************************************************************ */

	//Get items from the orderDetails
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	//Get items from the orderPay state **************************
	const orderPay = useSelector((state) => state.orderPay);
	const { success: successPay, loading: loadingPay } = orderPay;
	//************************************************************ */

	//Get items from the orderPay state **************************
	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { success: successOnDeliver, loading: loadingOnDeliver } = orderDeliver;
	//************************************************************ */

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		if (!order || order._id !== orderId) {
			dispatch(getOrderDetails(orderId));
		}

		/*=================================================================================
		To intergrate Paypal 
		The script is :
		<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
		But here we want to get it dynamically.
		We have a route that access the environment variable that has the client ID.
		*/

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

			script.onload = () => {
				setSDKReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || order._id !== orderId || successPay || successOnDeliver) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDERS_DELIVER_RESET });

			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSDKReady(true);
			}
		}

		//-----------------------------------------------------------------------------------------
	}, [
		order,
		orderId,
		successPay,
		successOnDeliver,
		dispatch,
		history,
		userInfo,
	]);

	//========================================================================================
	/* Handlers for the 2 buttons, to mark as delivered by the admin and to pay by the 
	client */
	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	const deliverHandler = (orderId) => {
		deliverOrder(orderId);
	};

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
										<strong>Name: </strong> {order.user.name}
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
									{!order.isPaid && !userInfo.isAdmin && (
										<ListGroup.Item>
											{loadingPay && <Loader />}
											{!sdkReady ? (
												<Loader />
											) : (
												<PayPalButton
													amount={order.totalPrice}
													onSuccess={successPaymentHandler}
												/>
											)}
										</ListGroup.Item>
									)}
									{loadingOnDeliver && <Loader />}
									{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
										<ListGroup.Item>
											<Button
												type='button'
												className='btn btn-block'
												onClick={deliverHandler}>
												Mark as Delivered
											</Button>
										</ListGroup.Item>
									)}
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
