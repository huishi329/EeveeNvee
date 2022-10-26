const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { raw } = require('express');

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


router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    let reviews = await Review.findAll({

        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                include: {
                    model: SpotImage,
                    attributes: ['url'],
                    where: { preview: true },
                    required: false
                },
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
                required: false
            }

        ],
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

module.exports = {
    router,
    validateReview
};
