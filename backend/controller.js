const Borrow = require('./borrow'); // Add this
const mongoose = require('mongoose');

// Create Borrow
const createBorrow = async (req, res) => {
    const { student_id, book_id, due_date } = req.body;

    try {
        const borrow = await Borrow.create({ student_id, book_id, due_date });
        res.status(200).json({ success: true, message: borrow });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {

    createBorrow 
   
};
