const Borrow = require('./borrow');
const Book = require('./book');

// Create Borrow (borrow a book)
const createBorrow = async (req, res) => {
    const { student_id, book_id, due_date } = req.body;

    try {
        // Check if book exists
        const book = await Book.findOne({ book_id });
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Check if there are copies available
        if (book.copies <= 0) {
            return res.status(400).json({ success: false, message: "No copies available" });
        }

        // Create a borrow record
        const borrow = await Borrow.create({ student_id, book_id, due_date });

        // Reduce book copies by 1
        book.copies -= 1;
        await book.save();

        res.status(200).json({ success: true, message: "Book borrowed successfully", borrow });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
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
    getBookById
};
