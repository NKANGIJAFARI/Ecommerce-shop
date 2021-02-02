import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
	//const [showMessage, setShowMessage] = useState(true);
	//const [hideMessage, setShowMessage] = useState(true)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setShowMessage(false);
	// 	}, 3000);
	// }, []);

	return (
		<>
			<Alert variant={variant}>{children}</Alert>
		</>
	);
};

Message.defaultProps = {
	variant: 'info',
};
export default Message;
