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
     *
    */
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        street: "Thurlow St",
        city: "Vancouver",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.2827,
        lng: 123.1207,
        title: "Modern Coal Harbour Suite",
        description: "Welcome to my stylish and cozy condo. Centrally located in the heart of downtown. Super close to almost everything you need for a relax stay.",
        price: 278
      },
      {
        ownerId: 1,
        street: "Nelson St",
        city: "Vancouver",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.2827,
        lng: 123.1207,
        title: "CENTRAL MID-CENTURY LOFT",
        description: "Just renovated! Updated in 2022 with brand new furniture throughout! This is the most central location to downtown and steps away to EVERYTHING.",
        price: 202
      },
      {
        ownerId: 2,
        street: "Songhees Rd",
        city: "Victoria",
        state: "British Comlumbia",
        country: "Canada",
        lat: 48.4284,
        lng: 123.3656,
        title: "Victoria Downtown Suite",
        description: "Sit down to dinner with friends at a stylish table beneath a modern light fixture. Gather for a glass of wine on a leafy covered balcony with circled rattan chairs. A wood-floored living area boasts a tile-fronted fireplace for a hint of refinement.",
        price: 278
      },
      {
        ownerId: 2,
        street: "Lacon Rd",
        city: "Denman Island",
        state: "British Comlumbia",
        country: "Canada",
        lat: 49.5630,
        lng: 124.7981,
        title: "Oceanfront Denman Island Suite",
        description: "Experience luxury while in a rustic gulf island ocean front setting. Find absolute tranquility and calm in your finely hand crafted suite. With sumptuous king bed, spa-like bathroom, and your very own private infrared sauna with an ocean view, you will be able to unplug and unwind.",
        price: 219
      },
      {
        ownerId: 3,
        street: "Horton Bay Rd",
        city: "Mayne Island",
        state: "British Comlumbia",
        country: "Canada",
        lat: 48.8380,
        lng: 123.2877,
        title: "Cob Cottage",
        description: "Channel the pursuit of pause in this one-of-a-kind earth house. The cozy retreat was hand-sculpted using local and sustainable natural materials, and features a central living space with cantilevered slab stairs leading to the loft bedroom.",
        price: 200
      },
      {
        ownerId: 3,
        street: "Stevens Canyon Rd",
        city: "Leavenworth",
        state: "Washington",
        country: "United States",
        lat: 47.5962,
        lng: 120.6615,
        title: "Peak Haus",
        description: "'Peak Haus' is brand new, luxurious modern mountain home nestled in the middle of 3.5 acres of woodland valley. You'll gaze upon stunning snow capped mountains through the numerous over-sized view windows or from the large hot tub.",
        price: 1043
      },
      {
        ownerId: 4,
        street: "Ferry Rd",
        city: "Lopez Island",
        state: "Washington",
        country: "United States",
        lat: 48.4869,
        lng: 122.8955,
        title: "Stylish waterfront oasis with hot tub, stunning views, outdoor bar, WiFi & deck",
        description: "Absolutely gorgeous inside and out, this modern, wooded sanctuary is a luxury home on Lopez Island, set in a secluded forest on a dramatic waterfront bluff, offering plenty of privacy just walking distance from the ferry.",
        price: 501
      },
      {
        ownerId: 4,
        street: "Redrooffs Rd",
        city: "Halfmoon Bay",
        state: "British Comlumbia",
        country: "Canada",
        lat: 37.4636,
        lng: 122.4286,
        title: "Spectacular Oceanfront B&B - Beachcomber Suite",
        description: "Nestled into the granite of a sunny point surrounded by sea, the location of this boutique B&B is rated extreme oceanfront. You’d have to be sailing to be any closer.",
        price: 419
      },
      {
        ownerId: 5,
        street: "Back Rd",
        city: "Broad Cove",
        state: "Nova Scotia",
        country: "Canada",
        lat: 44.1847,
        lng: 64.4855,
        title: "Shackup Tower - 30 ft in the air & hot tub",
        description: "Perched high on an ocean hillside, built on 30 ft tall steel legs, the cozy quarters above are akin to an old ship’s cabin. With 360 views at 30ft up you can chart the sun and stars across the sky, set your rhythm to the ebb & flow of the tide and scout the surf from above.",
        price: 500
      },
      {
        ownerId: 5,
        street: "Chem. des Pompes",
        city: "Sorgues",
        state: "Provence-Alpes-Côte d'Azur",
        country: "France",
        lat: 44.0088,
        lng: 4.8728,
        title: "Cabane Spa Paradis",
        description: "Découvrez la cabane Spa Paradis : empruntez un ponton en bois et embarquez sur votre cabane flottante pour un séjour hors du temps au fil de l’eau. À l’intérieur de votre cocon, vous trouverez une salle de bain, un coin salon lumineux ainsi qu’une chambre avec une vue imprenable sur le lac de la Lionne. Idéale pour un séjour romantique, les baies vitrées ouvertes sur la nature vous offriront de somptueux lever et coucher de soleil.",
        price: 471
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
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    });
  }
};
