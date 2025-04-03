const express = require('express');
const router = express.Router();

const { createBorrow, addBook, getBooks } = require('./controller');

// Routes
router.post('/borrow', createBorrow);
router.post('/add', addBook);
router.get('/list', getBooks);

module.exports = router;
