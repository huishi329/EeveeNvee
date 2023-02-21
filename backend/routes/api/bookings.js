const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Booking, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateBooking, validateDate } = require('../../utils/reqValidation');

const isBookingExisting = async (req, res, next) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    req.booking = booking;
    next();
};

const isBookingOwner = (req, res, next) => {
    const { booking, user } = req;

    if (booking.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };
    next();
};

router.put('/:bookingId', requireAuth, isBookingExisting, isBookingOwner, validateBooking, validateDate,
    async (req, res) => {
        const { booking } = req;
        const { startDate, endDate, serviceFee, cleaningFee, total } = req.body;

        if (new Date(booking.endDate) <= new Date()) {
            return res.status(403).json({
                message: "Past bookings can't be modified",
                statusCode: 403
            })
        };

        booking.set({ startDate, endDate, serviceFee, cleaningFee, total });
        await booking.save();

        res.json(booking);
    });

router.delete('/:bookingId', requireAuth, isBookingExisting, isBookingOwner,
    async (req, res) => {
        const { booking } = req;


        if (new Date(booking.startDate) <= new Date()) {
            return res.status(403).json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
        }

        await booking.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    });

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let bookings = await Booking.findAll({

        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: SpotImage,
                    attributes: ['url'],
                    where: { position: 0 },
                    required: false
                },
                {
                    model: User,
                    attributes: ['firstName', 'lastName']
                }
            ],
        },
        where: {
            userId: user.id
        },
    });

    const results = bookings.map(booking => {
        booking = booking.toJSON();
        // Add if statement so that data still loads when there are no SpotImages
        if (booking.Spot.SpotImages[0]) {
            booking.Spot.previewImage = booking.Spot.SpotImages[0].url;
        } else {
            booking.Spot.previewImage = null;
        }
        delete booking.Spot.SpotImages;

        booking.Spot.Owner = booking.Spot.User;
        delete booking.Spot.User;

        return booking;
    });
    res.json(results);
});

module.exports = router;
