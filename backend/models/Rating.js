const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Rating = sequelize.define('Rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  listingId: { type: DataTypes.INTEGER, allowNull: false },
  stars: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Rating;