import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to ProShop',
	description: 'Where affordability meets best quality',
	keywords: 'electronics, by electronics, cheap electronics',
};

export default Meta;
