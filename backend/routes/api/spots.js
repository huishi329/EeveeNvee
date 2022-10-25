const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');
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
        where: {
            ownerId: user.id
        },
        // Add [sequelize.col('SpotImages.url'), 'previewImage'] as the second attribute to pass Postgres's constraint
        group: ['Spot.id', [sequelize.col('SpotImages.url'), 'previewImage']]
    });
    res.json({ Spots: spots });
});

module.exports = router;
