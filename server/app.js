const express = require('express');
const { PORT } = require("./constants");
const placesRoutes = require('./routes/places-route');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/https-error');
const { MONGODB_CONNECTION_STRING } = require('./constants');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.use('/api/places', placesRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route', 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	};

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unkown error occurred!' });

});


mongoose.connect(MONGODB_CONNECTION_STRING)
	.then(() => {
		app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`))
	})
	.catch(() => console.log('Database failed to connect'));