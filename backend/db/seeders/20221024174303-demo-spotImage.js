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
     await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url:'https://www.airbnb.ca/rooms/24372539?adults=1&category_tag=Tag%3A7769&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-26&check_out=2022-12-02&federated_search_id=0b56d44c-ce0b-4c35-8001-53b3950d734e&source_impression_id=p3_1666559125_siwLB6jhJi4rsG%2Fm&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1380297615',
        preview: true
      },
      {
        spotId: 1,
        url:'https://www.airbnb.ca/rooms/24372539?adults=1&category_tag=Tag%3A7769&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-26&check_out=2022-12-02&federated_search_id=0b56d44c-ce0b-4c35-8001-53b3950d734e&source_impression_id=p3_1666559125_siwLB6jhJi4rsG%2Fm&modal=PHOTO_TOUR_SCROLLABLE&modalItem=1380296926',
        preview: false
      },
      {
        spotId: 3,
        url:'https://www.airbnb.ca/rooms/41432531?adults=1&category_tag=Tag%3A7769&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-11-01&check_out=2022-11-06&federated_search_id=0b56d44c-ce0b-4c35-8001-53b3950d734e&source_impression_id=p3_1666558896_tfQqMxVCesz2X5%2Bu&modal=PHOTO_TOUR_SCROLLABLE',
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
  }
};
