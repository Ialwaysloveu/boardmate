const express = require('express');
const { body } = require('express-validator');
const listingController = require('../controllers/listingController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', listingController.getListings);
router.get('/:id', listingController.getListing);
router.post('/', auth, upload.single('image'), [
  body('title').notEmpty(),
  body('location').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('room_type').isIn(['Single', 'Shared']),
  body('contact_email').isEmail(),
], listingController.createListing);
router.put('/:id', auth, listingController.updateListing);
router.delete('/:id', auth, listingController.deleteListing);

module.exports = router;