const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.col('SpotImages.url'), 'previewImage'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating']],
        },
        include: [
            {
                model: SpotImage,
                where: { preview: true },
                attributes: [],
                required: false
            },
            {
                model: Review,
                attributes: [],
                required: false
            },
        ],
        // Add [sequelize.col('SpotImages.url'), 'previewImage'] as the second attribute to pass Postgres's constraint
        group: ['Spot.id', [sequelize.col('SpotImages.url'), 'previewImage']]
    });
    res.json({ Spots: spots });
})


router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req;
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating'],
                [sequelize.col('SpotImages.url'), 'previewImage']]
        },
        include: [
            {
                model: SpotImage,
                where: { preview: true },
                attributes: [],
                required: false
            },
            {
                model: Review,
                attributes: [],
                required: false
            },
        ],
        where: {
            ownerId: user.id
        },
        group: ['Spot.id', [sequelize.col('SpotImages.url'), 'previewImage']]
    });
    res.json({ Spots: spots });
});

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId, {
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating']]
        },
        include: [
            // {
            //     model: SpotImage,
            //     where: { preview: true },
            //     attributes: ['id', 'url', 'preview'],
            //     required: false
            // },
            {
                model: Review,
                attributes: [],
                required: false
            },
            // {
            //     model: User,
            //     as: 'Owner',
            //     attributes: ['id','firstName', 'lastName']

            // }
        ],
        group: ['Spot.id'],
        // raw: true
    });

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const spotImages = await spot.getSpotImages({
        attributes: ['id', 'url', 'preview']
    });

    const owners = await spot.getUser({
        attributes: ['id','firstName', 'lastName']
    })

    spot = spot.toJSON();
    spot.SpotImages = spotImages;
    spot.Owners = owners;
    res.json(spot);

})

module.exports = router;
