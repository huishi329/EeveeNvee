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
        ownerId: 1,
        address: "Nelson St",
        city: "Vancouver",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.2827,
        lng: 123.1207,
        name: "CENTRAL MID-CENTURY LOFT",
        description: "Just renovated! Updated in 2022 with brand new furniture throughout! This is the most central location to downtown and steps away to EVERYTHING.",
        price: 202
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
      },
      {
        ownerId: 4,
        address: "Horton Bay Rd",
        city: "Mayne Island",
        state: "British Comlumbia",
        country: "Canada",
        lat: 48.8380,
        lng: 123.2877,
        name: "Cob Cottage",
        description: "Channel the pursuit of pause in this one-of-a-kind earth house. The cozy retreat was hand-sculpted using local and sustainable natural materials, and features a central living space with cantilevered slab stairs leading to the loft bedroom.",
        price: 200
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
        [Op.in]: ["Modern Coal Harbour Suite", "Victoria Downtown Suite", "Oceanfront Denman Island Suite", "CENTRAL MID-CENTURY LOFT"]
      }
    });
  }
};
