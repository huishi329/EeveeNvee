const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');


router.get('/', async(req, res, next) => {
    const spots = await Spot.findAll({
        include:[
            {
                model: SpotImage,
                where: {
                    preview: true
                }
            },
            {
                model: Review,
                attributes: [
                    [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 2), 'avgRating']
                ]
            }
        ]
    })
    res.json(spots);
})

module.exports = router;
