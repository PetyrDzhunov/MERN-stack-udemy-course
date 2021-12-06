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

router.get('/', (req, res) => {
	console.log('GET REQUEST in Places');
	res.json({ message: 'It works!' });
});

router.get('/:pid', (req, res) => {
	const { pid } = req.params;
	console.log(pid);
	const place = DUMMY_PLACES.find((place) => place.id === pid);
	console.log(place);
	res.json({ place });
});


module.exports = router;