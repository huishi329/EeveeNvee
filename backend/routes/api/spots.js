const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');


router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        attributes: [`id`, `ownerId`, `address`, `city`,
            `state`, `country`, `lat`, `lng`, `name`, `description`, `price`, `createdAt`,
            `updatedAt`,
            [sequelize.col('SpotImages.url'), 'previewImage'],
            [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating']],
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

module.exports = router;
