const Borrow = require('./borrow');
const Book = require('./book');

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
// Add a new book to the inventory
const addBook = async (req, res) => {
    const { book_id, title, author, copies } = req.body;

    try {
        const existingBook = await Book.findOne({ book_id });
        if (existingBook) {
            return res.status(400).json({ success: false, message: 'Book already exists' });
        }

        const newBook = new Book({ book_id, title, author, copies });
        await newBook.save();

        res.status(201).json({ success: true, message: "Book added successfully", newBook });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding book', error });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching books', error });
    }
};

// Get a specific book by book_id
const getBookById = async (req, res) => {
    const { book_id } = req.params;

    try {
        const book = await Book.findOne({ book_id });
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching book', error });
    }
};

module.exports = {
    createBorrow,
    addBook,
    getBooks,
    getBookById,
    getBorrowWithFine
};
