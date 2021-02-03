import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listProducts } from '../actions/productActions';

const ProductListSreen = ({ history }) => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	//==================================================================================
	//Delete user Handler
	const deleteUserHandler = (userId, productName) => {
		if (window.confirm(`ARE YOU SURE TO DELETE: ${productName} `)) {
			//delete product
		}
	};

	//----------------------------------------------------------------------------

	//==================================================================================
	//Create product handler
	const createProductHandler = (product) => {
		//create products
	};

	//----------------------------------------------------------------------------

	return (
		<>
			<Row>
				<Col>
					<h2>products</h2>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th>In Stock</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product.name}</td>
								<td>$ {product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>{product.countInStock}</td>

								{/* <td>{product.inStock}</td> */}

								<td>
									<LinkContainer to={`/admin/products/${product._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger '
										className='btn-sm'
										onClick={() =>
											deleteUserHandler(product._id, product.name)
										}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListSreen;
