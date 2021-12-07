const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/https-error');

const { validationResult } = require('express-validator');
const User = require('../models/user');



const getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data', 422));
	};

	const { name, email, password, places } = req.body;
	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		q
		const error = new HttpError('Signing up failed, please try again later.', 500);
		return next(error);
	};

	if (existingUser) {
		const error = new HttpError('User exists already, please login instead.', 422);
		return next(error);
	};

	const createdUser = new User({
		name,
		email,
		image: 'https://bsmedia.business-standard.com/_media/bs/img/article/2021-09/20/full/1632080404-7898.jpg',
		password,
		places
	});
	console.log(createdUser);

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError('Signing up failed, please try again later.', 500);
		return next(error);
	};

	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
	const { email, password } = req.body;
	const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
	if (!identifiedUser || identifiedUser.password !== password) {
		throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
	};

	res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;