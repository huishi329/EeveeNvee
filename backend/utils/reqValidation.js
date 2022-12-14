const { check } = require('express-validator');
const { Booking } = require('../db/models');
const { handleValidationErrors } = require('./validation');
const { Op } = require('sequelize');

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.startDate)) {
                throw new Error('endDate cannot be on or before startDate')
            }
            return value;
        }),
    handleValidationErrors
];

const validateDate = async (req, res, next) => {
    const { startDate, endDate } = req.body;
    let spotId;
    if (req.spot) {
        spotId = req.spot.id;
    }
    if (req.booking) {
        spotId = req.booking.spotId
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: spotId,
            endDate: {
                [Op.gte]: startDate
            },
            startDate: {
                [Op.lte]: endDate
            }
        },
        attributes: ['startDate', 'endDate']
    });

    const pendingStartDateObj = new Date(startDate);
    const pendingEndDateObj = new Date(endDate);

    for (const booking of bookings) {
        const errors = {};
        const bookingStartDateObj = new Date(booking.startDate);
        const bookingEndDateObj = new Date(booking.endDate)
        if (pendingStartDateObj >= bookingStartDateObj
            && pendingStartDateObj <= bookingEndDateObj) {
            errors.startDate = 'Start date conflicts with an existing booking'
        }
        if (pendingEndDateObj >= bookingStartDateObj
            && pendingEndDateObj <= bookingEndDateObj) {
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
    validateReview,
    validateBooking,
    validateDate,
};
