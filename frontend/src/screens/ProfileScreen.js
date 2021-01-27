import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	//Get the userInfo from the userLogin to verify user is logged in
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	//Get userLogin state.

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	console.log('user', user);

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
				/*'profile', according to the route, we get user on "api/users/profile"
                And the user Id will be got on the userLogin details in the route so here 
                we just pass in profile so we got to the proflie screen */
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	//Handle what happens when a user click to submit the for details
	const submitHandler = (e) => {
		e.preventDefault();

		//Check if the passwords match
		if (password !== confirmPassword) {
			setMessage("Password doesn't match");
		} else {
			//Dispatch updated profile here.
		}
	};
	return (
		//Form container is a component, and inside details are the children
		<Row>
			<Col>
				<h1>User Profile</h1>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Enter Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Your Name'
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter Your Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter Your Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Your Password'
							value={confirmPassword}
							onChange={(e) =>
								setConfirmPassword(e.target.value)
							}></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h3>My Orders</h3>
			</Col>
		</Row>
	);
};

export default ProfileScreen;