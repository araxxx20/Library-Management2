const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
    student_id: { 
        type: String, 
        required: true },
    book_id: { 
        type: String,
         required: true },
    due_date: { 
        type: Date, 
        required: true },
    fine: {
        fine_amount: { 
            type: Number, 
            default: 0 }, // Default no fine
        due_date: { type: Date, required: false }
    }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
