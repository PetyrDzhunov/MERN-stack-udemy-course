
const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cubicles.hdzkr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
module.exports = {
	PORT,
	MONGODB_CONNECTION_STRING
};