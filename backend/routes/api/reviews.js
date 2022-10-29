const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { validateReview } = require('../../utils/reqValidation');

const isReviewExisting = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    req.review = review;
    next();
}

const isReviewOwner = (req, res, next) => {
    const { review, user } = req;

    if (review.userId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    }

    next();
}

router.post('/:reviewId/images', requireAuth, isReviewExisting, isReviewOwner, async (req, res) => {
    const { reviewId } = req.params;
    const { review } = req;
    const { url } = req.body;

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

router.put('/:reviewId', requireAuth, isReviewExisting, isReviewOwner, validateReview, async (req, res) => {
    const { review } = req;
    const { review: reviewText, stars } = req.body;

    review.set({
        review: reviewText,
        stars
    })
    await review.save();

    res.json(review);
}
)

router.delete('/:reviewId', requireAuth, isReviewExisting, isReviewOwner, async (req, res) => {
    const { review } = req;

    await review.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
}
)

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let reviews = await Review.findAll({

        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
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

module.exports = router;
