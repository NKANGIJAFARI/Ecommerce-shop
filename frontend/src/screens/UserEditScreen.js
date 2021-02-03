import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const UserEditScreen = ({ match }) => {
	const userId = match.params.id;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState('');

	const dispatch = useDispatch();

	//Get user Details.
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	console.log(user, 'User inforation');

	useEffect(() => {
		if (!user || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, userId, dispatch]);

	//Handle what happens when a user click to submit the for details
	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<Link to='/admin/userslist' className='btn btn-light my-3'>
				GO Back
			</Link>

			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
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
						<Form.Group controlId='isAdmin'>
							<Form.Label>Is Admin</Form.Label>
							<Form.Check
								type='checkbox'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
		//Form container is a component, and inside details are the children
	);
};

export default UserEditScreen;
