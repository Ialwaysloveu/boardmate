const { validationResult } = require('express-validator');
const Listing = require('../models/Listing');
const Rating = require('../models/Rating');

exports.getListings = async (req, res) => {
  const { search, type } = req.query;
  const where = {};
  if (search) where.title = { [require('sequelize').Op.iLike]: `%${search}%` };
  if (type) where.room_type = type;
  const listings = await Listing.findAll({ where });
  res.json(listings);
};

exports.getListing = async (req, res) => {
  const listing = await Listing.findByPk(req.params.id, { include: Rating });
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(listing);
};

exports.createListing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, location, price, room_type, contact_email, latitude, longitude, wifi, ac } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const listing = await Listing.create({
    title, description, location, price, room_type, contact_email, image, latitude, longitude, wifi: wifi === 'true', ac: ac === 'true', userId: req.user.id
  });
  res.status(201).json(listing);
};

exports.updateListing = async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);
  if (!listing || listing.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  await listing.update(req.body);
  res.json(listing);
};

exports.deleteListing = async (req, res) => {
  const listing = await Listing.findByPk(req.params.id);
  if (!listing || listing.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  await listing.destroy();
  res.json({ message: 'Deleted' });
};