const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	// if there's no header or if the header doesn't start with Bearer
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('No token provided');
	}

	// token is the string that exists after the "Bearer " in authHeader, so the second value in the space-separated string
	const token = authHeader.split(' ')[1];
	// console.log(token);

	try {
		// values come from the payload
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded;
		req.user = { id, username };
		next();
	} catch (error) {
		console.log('test1');
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};

module.exports = authenticationMiddleware;
