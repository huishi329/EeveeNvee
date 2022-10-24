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
     *
    */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "Thurlow St",
        city: "Vancouver",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.2827,
        lng: 123.1207,
        name: "Modern Coal Harbour Suite",
        description: "Welcome to my stylish and cozy condo. Centrally located in the heart of downtown. Super close to almost everything you need for a relax stay.",
        price: 278
      },
      {
        ownerId: 2,
        address: "Songhees Rd",
        city: "Victoria",
        state: "British Comlumbia",
        country: "Canada",
        lat: 48.4284,
        lng: 123.3656,
        name: "Victoria Downtown Suite",
        description: "Sit down to dinner with friends at a stylish table beneath a modern light fixture. Gather for a glass of wine on a leafy covered balcony with circled rattan chairs. A wood-floored living area boasts a tile-fronted fireplace for a hint of refinement.",
        price: 278
      },
      {
        ownerId: 3,
        address: "Lacon Rd",
        city: "Denman Island",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.5630,
        lng: 124.7981,
        name: "Oceanfront Denman Island Suite",
        description: "Experience luxury while in a rustic gulf island ocean front setting. Find absolute tranquility and calm in your finely hand crafted suite. With sumptuous king bed, spa-like bathroom, and your very own private infrared sauna with an ocean view, you will be able to unplug and unwind.",
        price: 219
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      name: {
        [Op.in]: ["Modern Coal Harbour Suite", "Victoria Downtown Suite", "Oceanfront Denman Island Suite"]
      }
    });
  }
};