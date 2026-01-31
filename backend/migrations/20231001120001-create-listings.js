'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Listings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      location: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },
      room_type: { type: Sequelize.ENUM('Single', 'Shared'), allowNull: false },
      contact_email: { type: Sequelize.STRING, allowNull: false },
      image: { type: Sequelize.STRING },
      latitude: { type: Sequelize.FLOAT },
      longitude: { type: Sequelize.FLOAT },
      wifi: { type: Sequelize.BOOLEAN, defaultValue: false },
      ac: { type: Sequelize.BOOLEAN, defaultValue: false },
      rating_total: { type: Sequelize.FLOAT, defaultValue: 0 },
      rating_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Listings');
  }
};