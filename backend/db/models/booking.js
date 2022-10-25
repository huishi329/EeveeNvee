'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      );
      Booking.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isNotBeforeCurrDate(value) {
          if (new Date(value) < new Date()) {
            throw new Error('Start Date must be equal or greater than current date.')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value) {
          if (new Date(this.startDate) > new Date(value)) {
            throw new Error('End date must be greater than start date.')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
