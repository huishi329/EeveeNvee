'use strict';
const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-1-21'),
        endDate: new Date('2023-1-30')
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('2023-2-21'),
        endDate: new Date('2023-2-25')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-12-21'),
        endDate: new Date('2023-12-26')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', {
      id: {
        [Op.in]: [1, 2, 3]
      }
    });
  }
};
