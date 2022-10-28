const express = require('express')
const router = express.Router();
const { Spot, ReviewImage, Booking, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');


const isImageExisting = async (req, res, next) => {
    const { imageId } = req.params;
    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }
    req.reviewImage = reviewImage;
    next();
};

router.delete('/:imageId', restoreUser, requireAuth, isImageExisting,
    async (req, res) => {
        const { reviewImage, user } = req;
        const review = await reviewImage.getReview();
        // console.log(reviewImage)

        if (review.userId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            });
        };

        await reviewImage.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
)

module.exports = router;
