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

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;

	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		const error = new HttpError('Logging in failed, please try again later.', 500);
		return next(error);
	};

	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError('Invalid credentials, could not log you in.', 401);
		return next(error);
	};




	res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;