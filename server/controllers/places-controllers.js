const HttpError = require('../models/https-error');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
	const { pid } = req.params;
	let place;

	try {
		place = await Place.findById(pid);
	} catch (err) {
		const error = new HttpError('Something went wrong, could not find a place.', 500);
		return next(error);
	};

	if (!place) {
		const error = new HttpError('Could not find a place for the provided id.', 404);
		return next(error);
	};

	res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
	const { uid } = req.params;
	let places;
	try {
		places = await Place.find({ creator: uid });
	} catch (err) {
		const error = new HttpError('Fetching places failed, please try again later', 500);
		return next(error);
	};

	if (!places || places.length === 0) {
		return next(new HttpError('Could not find places for the provided user id,', 404));
	};
	res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid inputs passed, please check your data.', 422));
	};

	const { title, description, coordinates, address, creator } = req.body;
	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image: "https://bsmedia.business-standard.com/_media/bs/img/article/2021-09/20/full/1632080404-7898.jpg",
		creator
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		const error = new HttpError('Creating place failed, please try again', 500);
		return next(error);
	};

	if (!user) {
		const error = new HttpError('Could not find user for provided id.', 404);
		return next(error);
	};

	console.log(user);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPlace.save({ session: sess });
		await user.places.push(createdPlace);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating place failed, please try again.', 500);
		return next(error);
	};
	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422))
	};

	const { title, description } = req.body;
	const { pid } = req.params;
	let place;
	try {
		place = await Place.findById(pid);
	} catch (err) {
		const error = new HttpError('Something went wrong, could not update places.', 500);
		return next(error);
	};

	place.title = title;
	place.description = description;
	try {
		await place.save();

	} catch (err) {
		const error = new HttpError('Something went wrong, could not update place.', 500);
		return next(error);
	};

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	const { pid } = req.params;
	let place;

	try {
		place = await Place.findById(pid).populate('creator');
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete the specified place!', 500);
		return next(error);
	};

	if (!place) {
		const error = new HttpError('Could not find place for this id.', 404);
		return next(error);
	};

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await place.remove({ session: sess });
		place.creator.places.pull(place);
		await place.creator.save({ session: sess });
		await sess.commitTransaction()
	} catch (err) {
		const error = new HttpError('Something went wrong, could not delete the specified place!', 500);
		return next(error);
	};
	res.status(200).json({ message: 'Deleted place' })
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;