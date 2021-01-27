import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	//Get userLogin state.
	const userLogin = useSelector((state) => state.userLogin);

	const { loading, error, userInfo } = userLogin;

	/*If we need to redirect the user when they click a button, we use this redirect */
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		//Whenever userInfo is available, let redirect the user

		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	//Handle what happens when a user click to submit the for details
	const submitHandler = (e) => {
		e.preventDefault();

		//Dispatch logoin here.
		dispatch(Login(email, password));
	};
	return (
		//Form container is a component, and inside details are the children
		<FormContainer>
			<h1>Sign In</h1>

			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Entre Your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Entre Your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer? {console.log('Redirect', redirect)}
					<Link to={userInfo ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
