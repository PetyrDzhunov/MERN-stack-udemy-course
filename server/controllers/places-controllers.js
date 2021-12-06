const uuid = require('uuid/v4');
const HttpError = require('../models/https-error');

const DUMMY_PLACES = [
	{
		id: 'p1',
		title: "Empire State Building",
		description: "One of the most famous sky scrapers in the world!",
		location: {
			lat: 40.7488474,
			lang: -73.9871516
		},
		address: "20 W 34th St, New York, NY 10001",
		creator: 'u1'
	}
];

const getPlaceById = (req, res, next) => {
	const { pid } = req.params;
	const place = DUMMY_PLACES.find((place) => place.id === pid);
	if (!place) {
		const error = new HttpError('Could not find a place for the provided id.', 404);
		return next(error);
	};

	res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
	const { uid } = req.params;
	const places = DUMMY_PLACES.find((place) => place.creator === uid);
	if (!places) {
		return next(new HttpError('Could not find a place for the provided user id,', 404));
	};
	res.json({ places });
};

const createPlace = (req, res, next) => {
	const { title, description, coordinates, address, creator } = req.body;
	const createdPlace = { id: uuid(), title, description, location: coordinates, address, creator };
	DUMMY_PLACES.push(createPlace);
	res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;