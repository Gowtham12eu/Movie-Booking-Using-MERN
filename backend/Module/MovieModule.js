const mongoose = require('mongoose');

module.exports = (connection) => {
  const movieSchema = new mongoose.Schema({
    title: String,
    image: String,
    releaseDate: String,
    rating: String
  });

  return connection.model('movieData', movieSchema);
};
