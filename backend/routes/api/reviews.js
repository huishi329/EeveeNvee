const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

router.post('/:reviewId/images', restoreUser, requireAuth,
    async (req, res) => {
        const { reviewId } = req.params;
        const { user } = req;
        const { url } = req.body;

        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        if (review.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
              });
        }

        const reviewImages = await review.getReviewImages();
        if (reviewImages.length >= 10) {
            return res.status(403).json({
                message: "Maximum number of images for this resource was reached",
                statusCode: 403
            })
        };

        const newReviewImage = await review.createReviewImage({
            reviewId,
            url
        });

        res.json({
            id: newReviewImage.id,
            url: newReviewImage.url
        });
    }
)

router.put('/:reviewId', restoreUser, requireAuth, validateReview,
    async (req, res) => {
        const { reviewId } = req.params;
        const { user } = req;
        const { review, stars } = req.body;

        const targetReview = await Review.findByPk(reviewId);
        if (!targetReview) {
            return res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        if (targetReview.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
              });
        }

       targetReview.set({
            review,
            stars
        })
        await targetReview.save();

        res.json(targetReview);
    }
)

router.delete('/:reviewId', restoreUser, requireAuth,
    async (req, res) => {
        const { reviewId } = req.params;
        const { user } = req;

        const targetReview = await Review.findByPk(reviewId);
        if (!targetReview) {
            return res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }

        if (targetReview.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
              });
        }

        await targetReview.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }
)

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
