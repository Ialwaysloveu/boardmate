'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Listings', [
      {
        title: 'Cozy Single Room in NYC',
        description: 'A comfortable single room with great views.',
        location: 'New York, NY',
        price: 1200.00,
        room_type: 'Single',
        contact_email: 'owner1@example.com',
        image: 'https://via.placeholder.com/300x200?text=NYC+Room',
        latitude: 40.7128,
        longitude: -74.0060,
        wifi: true,
        ac: true,
        rating_total: 0,
        rating_count: 0,
        createdAt: new Date(),
        userId: 1,
      },
      {
        title: 'Shared Apartment in London',
        description: 'Affordable shared space in central London.',
        location: 'London, UK',
        price: 800.00,
        room_type: 'Shared',
        contact_email: 'owner2@example.com',
        image: 'https://via.placeholder.com/300x200?text=London+Room',
        latitude: 51.5074,
        longitude: -0.1278,
        wifi: true,
        ac: false,
        rating_total: 0,
        rating_count: 0,
        createdAt: new Date(),
        userId: 1,
      },
      {
        title: 'Modern Single in Tokyo',
        description: 'High-tech room with all amenities.',
        location: 'Tokyo, Japan',
        price: 1500.00,
        room_type: 'Single',
        contact_email: 'owner3@example.com',
        image: 'https://via.placeholder.com/300x200?text=Tokyo+Room',
        latitude: 35.6895,
        longitude: 139.6917,
        wifi: true,
        ac: true,
        rating_total: 0,
        rating_count: 0,
        createdAt: new Date(),
        userId: 1,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Listings', null, {});
  }
};
