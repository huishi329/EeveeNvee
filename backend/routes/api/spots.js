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
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            }
        ]
    })
    res.json(spots);
})

module.exports = router;
