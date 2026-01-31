const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Listing = sequelize.define('Listing', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  room_type: { type: DataTypes.ENUM('Single', 'Shared'), allowNull: false },
  contact_email: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  latitude: { type: DataTypes.FLOAT },
  longitude: { type: DataTypes.FLOAT },
  wifi: { type: DataTypes.BOOLEAN, defaultValue: false },
  ac: { type: DataTypes.BOOLEAN, defaultValue: false },
  rating_total: { type: DataTypes.FLOAT, defaultValue: 0 },
  rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Listing;