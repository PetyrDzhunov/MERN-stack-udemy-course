const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	console.log('GET REQUEST in Places');
	res.json({ message: 'It works!' });
});


module.exports = router;