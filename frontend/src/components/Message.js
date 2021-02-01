import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	const [showMessage, setShowMessage] = useState(true);
	//const [hideMessage, setShowMessage] = useState(true);

	// useEffect(() => {
	// 	if (showMessage === true && hideMessage === false) {
	// 		setTimeout(() => {
	// 			if (showMessage === true) {
	// 				setShowMessage(false);
	// 			}
	// 		}, 3000);
	// 	} else {
	// 		setShowMessage(true);
	// 	}
	// }, []);

	return <>{showMessage && <Alert variant={variant}>{children}</Alert>}</>;
};

Message.defaultProps = {
	variant: 'info',
};
export default Message;
