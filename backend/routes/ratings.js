const express = require('express');
const ratingController = require('../controllers/ratingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:id/rate', auth, ratingController.rateListing);

module.exports = router;