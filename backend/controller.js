const Borrow = require('./borrow'); // Ensure correct import

// Create Borrow
const createBorrow = async (req, res) => {
    const { student_id, book_id, due_date, fine_amount, fine_due_date } = req.body;

    try {
        const borrow = await Borrow.create({
            student_id,
            book_id,
            due_date,
            fine: fine_amount ? { fine_amount, due_date: fine_due_date } : undefined
        });

        res.status(200).json({ success: true, message: borrow });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get borrow details with fine
const getBorrowWithFine = async (req, res) => {
    const studentId = req.params.id;

    try {
        const borrow = await Borrow.findOne({ student_id: studentId });

        if (borrow) {
            res.json(borrow);
        } else {
            res.status(404).json({ error: "Borrow record not found" });
        }
    } catch (error) {
        console.error("Error fetching borrow record:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createBorrow, getBorrowWithFine }; // Correct exports
