const express = require('express')
const router = express.Router()
const { getFines } = require('../backend/controller');



router.get('/:id/fines', getFines);
module.exports = router
