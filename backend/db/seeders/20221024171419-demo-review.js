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
      {
        spotId: 1,
        userId: 3,
        review: 'Great place to stay in Coal Harbour! Persia is thoughtful and communicative. We had a great visit!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Overall good. The location is amazing. The room looks smaller and older than the picture. But it got everything you needed. Noise from the street could be another factor to consider.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Absolutely loved our stay at the cob cottage. Such a great place to unplug and be surrounded by nature. Alexis was a great host, prompt replies and made sure we were well taken care of after a power outage from the storm! Can’t wait to come back in the future!',
        stars: 5
      },
      {
        spotId: 9,
        userId: 4,
        review: 'Everything was great, and I especially liked the privacy and great view.',
        stars: 5
      },
      {
        spotId: 9,
        userId: 3,
        review: 'Mesmerizing. Unique. Memorable. The level of detail, the ambiance of tranquility… everything was perfect.',
        stars: 5
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    });
  }
};
