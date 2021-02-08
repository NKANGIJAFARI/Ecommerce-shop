import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

import {
	listProducts,
	deleteProducts,
	createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListSreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error, page, pages } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingOnDelete,
		error: errorOndelete,
		success: successOnDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingOnCreate,
		error: errorOnCreate,
		success: successOnCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		/*Because only admins can access this page, when the userInfo.admin is not 
		true, that means the token is expired thats why we redirect them to the 
		login page rather than home or any page*/
		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login');
		}

		if (successOnCreate) {
			history.push(`/admin/products/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		history,
		userInfo,
		successOnDelete,
		successOnCreate,
		createdProduct,
		pageNumber,
	]);

	//==================================================================================
	//Delete user Handler
	const deleteUserHandler = (productId, productName) => {
		if (window.confirm(`ARE YOU SURE TO DELETE: ${productName} `)) {
			//delete product
			dispatch(deleteProducts(productId));
		}
	};

	//----------------------------------------------------------------------------

	//==================================================================================
	//Create product handler
	const createProductHandler = (product) => {
		dispatch(createProduct());
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
			{loadingOnDelete && !loadingOnCreate && !loading && <Loader />}
			{errorOndelete && <Message variant='danger'>{errorOndelete}</Message>}
			{loadingOnCreate && !loadingOnDelete && !loading && <Loader />}
			{errorOnCreate && <Message variant='danger'>{errorOnCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped bordered hover responsive size='sm'>
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
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListSreen;
