const express = require('express');
const router = express.Router();

const { createBorrow } = require('./controller');

router.post('/borrow', createBorrow); 

module.exports = router;
