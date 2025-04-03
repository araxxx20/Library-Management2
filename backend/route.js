const express = require('express');
const router = express.Router();

const { 
    createBorrow,
    getBorrowWithFine 

} = require('./controller');

router.post('/borrow', createBorrow);
router.get('/:id/fines', getBorrowWithFine); 

module.exports = router;
