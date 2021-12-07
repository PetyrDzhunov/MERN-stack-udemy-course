const HttpError = require('../models/https-error');
const { validationResult } = require('express-validator');
const Place = require('../models/place');

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
	try {
		console.log(createdPlace);
		await createdPlace.save();
	} catch (err) {
		const error = new HttpError('Creating place failed, please try again.', 500);
		return next(error);
	};
	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new HttpError('Invalid inputs passed, please check your data.', 422);
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

const deletePlace = (req, res, next) => {
	const { pid } = req.params;
	if (!DUMMY_PLACES.find(p => p.id === pid)) {
		throw new HttpError('Could not find a place for that id.', 404);
	}
	DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== pid);
	res.status(200).json({ message: 'Deleted place' })
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;