const Rating = require('../models/Rating');
const Listing = require('../models/Listing');

exports.rateListing = async (req, res) => {
  const { stars } = req.body;
  const existing = await Rating.findOne({ where: { userId: req.user.id, listingId: req.params.id } });
  if (existing) return res.status(400).json({ error: 'Already rated' });

  await Rating.create({ userId: req.user.id, listingId: req.params.id, stars });
  const ratings = await Rating.findAll({ where: { listingId: req.params.id } });
  const total = ratings.reduce((sum, r) => sum + r.stars, 0);
  const count = ratings.length;
  await Listing.update({ rating_total: total, rating_count: count }, { where: { id: req.params.id } });
  res.json({ message: 'Rated' });
};