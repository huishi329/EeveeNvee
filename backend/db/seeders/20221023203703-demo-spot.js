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
        ownerId: 2,
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
        ownerId: 3,
        address: "Horton Bay Rd",
        city: "Mayne Island",
        state: "British Comlumbia",
        country: "Canada",
        lat: 48.8380,
        lng: 123.2877,
        name: "Cob Cottage",
        description: "Channel the pursuit of pause in this one-of-a-kind earth house. The cozy retreat was hand-sculpted using local and sustainable natural materials, and features a central living space with cantilevered slab stairs leading to the loft bedroom.",
        price: 200
      },
      {
        ownerId: 3,
        address: "Stevens Canyon Rd",
        city: "Leavenworth",
        state: "Washington",
        country: "United States",
        lat: 47.5962,
        lng: 120.6615,
        name: "Peak Haus",
        description: "'Peak Haus' is brand new, luxurious modern mountain home nestled in the middle of 3.5 acres of woodland valley. You'll gaze upon stunning snow capped mountains through the numerous over-sized view windows or from the large hot tub.",
        price: 1043
      },
      {
        ownerId: 4,
        address: "Ferry Rd",
        city: "Lopez Island",
        state: "Washington",
        country: "United States",
        lat: 48.4869,
        lng: 122.8955,
        name: "Stylish waterfront oasis with hot tub, stunning views, outdoor bar, WiFi & deck",
        description: "Absolutely gorgeous inside and out, this modern, wooded sanctuary is a luxury home on Lopez Island, set in a secluded forest on a dramatic waterfront bluff, offering plenty of privacy just walking distance from the ferry.",
        price: 501
      },
      {
        ownerId: 4,
        address: "Redrooffs Rd",
        city: "Halfmoon Bay",
        state: "British Comlumbia",
        country: "Canada",
        lat: 37.4636,
        lng: 122.4286,
        name: "Spectacular Oceanfront B&B - Beachcomber Suite",
        description: "Nestled into the granite of a sunny point surrounded by sea, the location of this boutique B&B is rated extreme oceanfront. You’d have to be sailing to be any closer.",
        price: 419
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
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8]
      }
    });
  }
};
