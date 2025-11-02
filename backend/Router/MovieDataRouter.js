const express = require('express');
const createMovieModel = require('../Module/MovieModule');

module.exports = (DB3) => {
  const router = express.Router();
  const MovieModel = createMovieModel(DB3);

  router.get('/moviedata', async (req, res) => {
    try {
      const data = await MovieModel.find({});
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
};
