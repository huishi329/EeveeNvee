const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateReview } = require('./review')

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

router.post('/', restoreUser, requireAuth, validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const { user } = req;

        const spot = await Spot.create({
            ownerId: user.id,
            address, city, state, country, lat, lng, name, description, price
        });
        res.status(201).json(spot);
    })

router.put('/:spotId', restoreUser, requireAuth, validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const { user } = req;
        const { spotId } = req.params;

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        if (spot.ownerId !== user.id) {
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }
        spot.set({
            address, city, state, country, lat, lng, name, description, price
        });

        await spot.save();

        res.json(spot);
    });

router.delete('/:spotId', restoreUser, requireAuth,
    async (req, res) => {
        const { user } = req;
        const { spotId } = req.params;

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        if (spot.ownerId !== user.id) {
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }
        await spot.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    })

router.post('/:spotId/images', restoreUser, requireAuth,
    async (req, res) => {
        const { url, preview } = req.body;
        const { user } = req;
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        if (spot.ownerId !== user.id) {
            res.status(403).json({
                message: "Forbidden",
                statusCode: 403
            })
        }

        const spotImage = await spot.createSpotImage({
            url,
            preview
        })
        res.json({
            id: spotImage.id,
            url,
            preview
        });
    }
)

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

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                where: { id: spotId },
                attributes: []
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
                required: false
            }
        ],
    });

    res.json({ Reviews: reviews });
});

router.get('/:spotId/bookings', restoreUser, requireAuth,
    async (req, res) => {
        const { spotId } = req.params;
        const { user } = req;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        let bookings;
        if (spot.ownerId === user.id) {
            bookings = await spot.getBookings({
                include: User
            })
        } else {
            bookings = await spot.getBookings({
                attributes: ['spotId', 'startDate', 'endDate']
            })
        }

        res.json({ Bookings: bookings });
    });

router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview,
    async (req, res) => {
        const { user } = req;
        const { spotId } = req.params;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        const userReview = await spot.getReviews({
            where: { userId: user.id }
        });

        if (userReview.length) {
            return res.status(403).json({
                message: "User already has a review for this spot",
                statusCode: 403
            });
        }

        const { review, stars } = req.body;
        const newReview = await spot.createReview({
            userId: user.id,
            review,
            stars
        });

        res.status(201).json(newReview);
    }
)

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId, {
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating']]
        },
        include: [
            {
                model: Review,
                attributes: [],
                required: false
            }
        ],
        group: ['Spot.id'],

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
        attributes: ['id', 'firstName', 'lastName']
    })

    spot = spot.toJSON();
    spot.SpotImages = spotImages;
    spot.Owners = owners;
    res.json(spot);

})

module.exports = router;
