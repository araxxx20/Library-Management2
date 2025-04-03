const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    copies: { type: Number, required: true, min: 0 } // Ensure copies don't go below 0
});

module.exports = mongoose.model('Book', bookSchema);
