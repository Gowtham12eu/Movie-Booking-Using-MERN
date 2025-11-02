const express = require('express');
const bookData = require('../Module/bookDataModule');
module.exports = (DB4) => {
    const router = express.Router();
    const bookDataModule = bookData(DB4);

    router.post('/book', async (req, res) => {
        try {
            const booking = new bookDataModule(req.body);
            await booking.save();
            res.status(201).json({ message: "Booking Saved Successfull", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error })
        }
    })
    router.get('/book', async (req, res) => {
        try {
            const bookings = await bookDataModule.find({});
            res.status(200).json({ success: true, data: bookings });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });
    return router;
}