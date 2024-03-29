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
        endDate: new Date('2021-1-30'),
        cleaningFee: 100,
        serviceFee: 100,
        total: 1000
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date('2023-2-21'),
        endDate: new Date('2023-2-25'),
        cleaningFee: 100,
        serviceFee: 100,
        total: 1000
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2023-12-21'),
        endDate: new Date('2023-12-26'),
        cleaningFee: 100,
        serviceFee: 100,
        total: 1000
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2022-12-21'),
        endDate: new Date('2022-12-26'),
        cleaningFee: 100,
        serviceFee: 100,
        total: 1000
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2022-11-21'),
        endDate: new Date('2022-11-23'),
        cleaningFee: 100,
        serviceFee: 100,
        total: 1000
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
        [Op.in]: [1, 2, 3, 4, 5]
      }
    });
  }
};
