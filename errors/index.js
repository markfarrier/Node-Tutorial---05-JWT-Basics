// because it's index.js you only need to point to the folder when doing the require, as index is selected by default

const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
	CustomAPIError,
	BadRequestError,
	UnauthenticatedError,
};
