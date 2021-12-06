const express = require('express');
const { PORT } = require("./constants");
const placesRoutes = require('./routes/places-route');
const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes)
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	};

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unkown error occurred!' });

});

app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`))