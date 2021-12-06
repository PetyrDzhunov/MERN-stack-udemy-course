const express = require('express');

const router = express.Router();
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


router.get('/:pid', (req, res, next) => {
	const { pid } = req.params;
	const place = DUMMY_PLACES.find((place) => place.id === pid);
	if (!place) {
		const error = new Error('Could not find a place for the provided id.');
		error.code = 404;
		next(error);
		return;
	};

	res.json({ place });
});

router.get('/user/:uid', (req, res, next) => {
	const { uid } = req.params;
	const places = DUMMY_PLACES.find((place) => place.creator === uid);
	if (!places) {
		const error = {
			code: 404,
			message: 'Could not find a place for the provided user id.'
		};
		next(error);
		return;
	};
});


module.exports = router;