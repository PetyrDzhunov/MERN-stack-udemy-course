const express = require('express');


const { PORT } = require("./constants");
const placesRoutes = require('./routes/places-route');
const app = express();


app.use('/api/places', placesRoutes)



app.listen(PORT, () => console.log(`Sever is running on port ${PORT}`))