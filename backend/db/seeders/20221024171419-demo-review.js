'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 3,
        userId: 1,
        review: 'Gorgeous peaceful setting, hosts quick to reply and answer any questions. Accommodation so cute and well thought out, nice to have kayaks and SUPs available. Definitely will be back.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'The house was incredible clean with a lovely atmosphere perfect for a couples getaway. Would absolutely recommend to a friend :)',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'It was everything we were looking for - beautiful, peaceful, and clean. The private sauna was delightful and the view from the backyard, picturesque.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 5,
        review: 'Easy to get to and centrally located. The apartment is clean and on a quiet floor which made relaxing easy. A great place to stay!',
        stars: 4
      },
     ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', {
      id: {
        [Op.in]: [1, 2, 3]
      }
     });
  }
};
