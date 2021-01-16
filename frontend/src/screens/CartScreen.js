import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Form,
	Button,
	Card,
	Image,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = (props) => {
	const { match, location, history } = props;

	const productId = match.params.id;

	//Get the quantity from the url, /cart/productId?qty="This one is quantity"
	const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;
	console.log({ cartItems });

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, quantity));
		}
	}, [dispatch, productId, quantity]);

	const removeFromCartHandler = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const checkOutHandler = () => {
		/*When a user clicks proceed to ccheckout, we shall send them to the login
		and if they are logged in we shall just redirect them to shipping page */
		history.push('/login?redirect=shipping');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>Your Cart is empty</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							//product is the id
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>

									<Col md={4}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.quantity}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}>
											{
												//Get the number of pro
												[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{' '}
														{x + 1}{' '}
													</option>
												))
											}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>
								{' '}
								subtotal (
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)}) Items
							</h3>
							$
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}>
								Proceed To CheckOut
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
