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
     *   title: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 9,
        userId: 2,
        startDate: new Date('2021-1-21'),
        endDate: new Date('2021-1-30')
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date('2023-2-21'),
        endDate: new Date('2023-2-25')
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2023-12-21'),
        endDate: new Date('2023-12-26')
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2022-12-21'),
        endDate: new Date('2022-12-26')
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2022-12-21'),
        endDate: new Date('2022-12-26')
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
        [Op.in]: [1, 2, 3, 4]
      }
    });
  }
};
