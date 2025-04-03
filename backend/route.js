const express = require('express');
const router = express.Router();

const { createBorrow, addBook, getBooks, getBookById } = require('./controller');

// Routes
router.post('/borrow', createBorrow);
router.post('/add', addBook);
router.get('/list', getBooks);

// New route for getting a specific book by book_id
router.get('/:book_id', getBookById);

module.exports = router;
