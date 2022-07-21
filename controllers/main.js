// check username, password in post(login) request
// if exist, create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
	const { username, password } = req.body;
	// when we work with databases we have 3 options
	// option 1: mongoose validation - checks for us
	// option 2: setup validation layer yourself, utilizing Joi package
	// option 3: check in the controller for username/password values coming from the req.body, utilizing custom errors
	if (!username || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	// just for demo, normally provided by DB
	const id = new Date().getDate();

	// try to keep payload small, better experience for user (e.g. bad/slow internet connections)
	// don't put password or any other confidential info in payload
	// just for demo, in production use long, complex, and unguessable string value for secret key
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	console.log(req.user);
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello, ${req.user.username}`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
};
