const { check } = require('express-validator');
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../db/models');
const { handleValidationErrors } = require('./validation');


const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, {req}) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('endDate cannot be on or before startDate')
            }
            return value;
        }),
    handleValidationErrors
];


const isSpotExisting = async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    req.spot = spot;
    next();
}

const validateDate = async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const { spot } = req;
    const bookings = await spot.getBookings();
    const currStartDateObj = new Date(startDate);
    const currEndDateObj = new Date(endDate);
    for (const booking of bookings) {
        const errors = {};
        const bookingStartDateObj = new Date(booking.startDate);
        const bookingEndDateObj = new Date(booking.endDate)
        if (currStartDateObj >= bookingStartDateObj
            && currStartDateObj <= bookingEndDateObj) {
            errors.startDate = 'Start date conflicts with an existing booking'
        }
        if (currEndDateObj >= bookingStartDateObj
            && currEndDateObj <= bookingEndDateObj) {
            errors.endDate = 'End date conflicts with an existing booking'
        }
        if (errors.startDate || errors.endDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors
            })
        }
    };
    next();
}

module.exports = {
    validateBooking,
    isSpotExisting,
    validateDate,
  };
