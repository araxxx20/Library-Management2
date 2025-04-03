const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    student_id: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Borrow', borrowSchema);
