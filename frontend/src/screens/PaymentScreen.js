import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	//Check if there is a shipping address, if no redirect to shippong screen
	if (!shippingAddress) {
		history.push('/shipping');
	}

	const dispatch = useDispatch();

	const [paymentMethod, setpaymentMethod] = useState('PayPal');

	const onsubmitHandler = (e) => {
		e.preventDefault();

		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={onsubmitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.check
						type='radio'
						label='PayPal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='PayPal'
						checked
						onChange={(e) => setpaymentMethod(e.target.value)}></Form.check>

					{/*Another payment Method if needded 
                    <Form.check
						type='radio'
						label='Stripe or Credit Card'
						id='Stripe'
						name='paymentMethod'
						value='Stripe'
						onChange={(e) => setpaymentMethod(e.target.value)}></Form.check> */}
				</Col>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
