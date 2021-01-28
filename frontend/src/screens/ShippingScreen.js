import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../actions/userActions';

const ShippingScreen = ({ history }) => {
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

	return <div>Shipping</div>;
};

export default ShippingScreen;
