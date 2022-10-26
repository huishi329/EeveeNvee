'use strict';
const { Op } = require('sequelize');
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
     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/1ac7e1c6-e80b-4b74-9377-245c55c208d3.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/7a42e674-0637-4634-9465-e5707815e6d6.jpeg?im_w=1440',
        preview: false
      },
      {
        spotId: 4,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/28cd8974-dd9c-40a0-8e84-07aa245d3780.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url:'https://a0.muscache.com/im/pictures/869cf08a-51f9-4c14-8e00-fae63a5fcd08.jpg?im_w=1200',
        preview: true
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('SpotImages', {
      id: {
        [Op.in]: [1, 2, 3, 4]
      }
     });
  }
};
