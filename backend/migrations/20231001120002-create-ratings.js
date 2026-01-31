'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
      listingId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Listings', key: 'id' } },
      stars: { type: Sequelize.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ratings');
  }
};