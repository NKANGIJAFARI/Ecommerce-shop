import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ size }) => {
	return (
		<Spinner
			animation='border'
			variant='secondary'
			role='status'
			style={{
				width: size === 'small' ? '50px' : size === 'big' && '100px',
				height: size === 'small' ? '50px' : size === 'big' && '100px',
				margin: 'auto',
				display: 'block',
			}}>
			<span className='sr-only'>Loading....</span>
		</Spinner>
	);
};

Loader.defaultProps = {
	size: 'big',
};
export default Loader;
