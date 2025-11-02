const mongoose = require('mongoose');

module.exports = (connection) => {
    const bookSchema = new mongoose.Schema({
        movieTitle: { type: String, required: true },
        movieSeat: { type: [String], required: true }, // ← array of strings
        TotalSeat: { type: Number, required: true },
        MoviePrice: { type: Number, required: true },
        movieDate: { type: String, required: true },
        movieImage: { type: String, required: true }
    });

    return connection.model('bookData', bookSchema);
};
