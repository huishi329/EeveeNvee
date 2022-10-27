const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Booking, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    let reviews = await Booking.findAll({

        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: {
                model: SpotImage,
                attributes: ['url'],
                where: { preview: true },
                required: false
            },
        },
        where: {
            userId: user.id
        },
    });

    const results = reviews.map(review => {
        review = review.toJSON();
        // Add if statement so that data still loads when there are no SpotImages
        if (review.Spot.SpotImages[0]) {
            review.Spot.previewImage = review.Spot.SpotImages[0].url;
        } else {
            review.Spot.previewImage = null;
        }
        delete review.Spot.SpotImages;
        return review;
    });

    res.json({ Reviews: results });
});

module.exports = router;
