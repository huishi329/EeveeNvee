'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Bookings', 'cleaningFee', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Bookings', 'serviceFee', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Bookings', 'total', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Bookings', 'cleaningFee');
    await queryInterface.removeColumn('Bookings', 'serviceFee');
    await queryInterface.removeColumn('Bookings', 'total');
  }
};
