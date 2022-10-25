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
     await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/06fc60ab-04c7-4903-950c-5992cbc40674.jpg?im_w=1440'
      },
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/be16ba4c-b5e3-4396-8c67-f59e9aadab45.jpeg?im_w=1440'
      },
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/a801424e-3196-4357-ba5b-f577dcddd998.jpeg?im_w=1440'
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ReviewImages', {
      id: {
        [Op.in]: [1, 2, 3]
      }
     });
  }
};
