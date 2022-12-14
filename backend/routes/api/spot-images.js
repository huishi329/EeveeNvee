const express = require('express')
const router = express.Router();
const { SpotImage } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');


const isImageExisting = async (req, res, next) => {
    const { imageId } = req.params;
    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }
    req.spotImage = spotImage;
    next();
};

router.delete('/:imageId', restoreUser, requireAuth, isImageExisting,
    async (req, res) => {
        const { spotImage, user } = req;
        const spot = await spotImage.getSpot();

        if (spot.ownerId !== user.id) {
            return res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            });
        };

        await spotImage.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
)

module.exports = router;
