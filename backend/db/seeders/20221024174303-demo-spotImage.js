'use strict';
const { Op } = require('sequelize');
const { uploadImageFromUrl } = require('../../aws');
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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/1ac7e1c6-e80b-4b74-9377-245c55c208d3.jpeg?im_w=1200'),
        preview: true
      },
      {
        spotId: 1,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/7a42e674-0637-4634-9465-e5707815e6d6.jpeg?im_w=1440'),
        preview: false
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/a6e4ce86-787a-46a2-9dd5-a11f718210ad.jpeg?im_w=1200'),
        preview: true
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/869cf08a-51f9-4c14-8e00-fae63a5fcd08.jpg?im_w=1200'),
        preview: true
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/802d5224-5cbc-4ec3-b163-4e608d319527.jpg?im_w=1200'),
        preview: true
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/e28d45ab-175b-45e4-9e22-9f2fc12b30df.jpg?im_w=720'),
        preview: true
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/b219a7f4-8465-497c-8a47-395ed96c9782.jpeg?im_w=1440'),
        preview: true
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/a8acecf7-5391-424d-9780-8460dbe1bf6b.jpeg?im_w=1440'),
        preview: true
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/f4d8c0f7-de93-4c7b-ac61-59c5686c34ae.jpg?im_w=1200'),
        preview: true
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg?im_w=1200'),
        preview: true
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl('https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/bcc58a39-61bf-45fb-998a-acfe45039582.jpeg?im_w=1200'),
        preview: true
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    });
  }
};
