const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isSpotExisting, validateBooking, validateDate } = require('../../utils/reqValidation');
const { isSpotOwner, isNotSpotOwner } = require('../../utils/authorization');
const { validateReview } = require('./reviews');
const { Op } = require('sequelize');

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

const ValidateSpotQuery = [
    check('maxLat')
        .if(check('maxLat').exists({ checkFalsy: true }))
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .if(check('minLat').exists({ checkFalsy: true }))
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .if(check('maxLng').exists({ checkFalsy: true }))
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .if(check('minLng').exists({ checkFalsy: true }))
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum Lngitude is invalid'),
    check('maxPrice')
        .if(check('maxPrice').exists({ checkFalsy: true }))
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    check('minPrice')
        .if(check('minPrice').exists({ checkFalsy: true }))
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
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

router.get('/', ValidateSpotQuery, async (req, res, next) => {
    const where = {};
    const { maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;

    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

    let limit, offset;
    if (page >= 1 && size >= 1) {
        limit = size;
        offset = size * (page - 1);
    };

    if (maxLat !== undefined) where.lat = ({ [Op.lte]: maxLat });
    if (minLat !== undefined) where.lat = ({ [Op.gte]: minLat });
    if (maxLng !== undefined) where.lng = ({ [Op.lte]: maxLng });
    if (minLng !== undefined) where.lng = ({ [Op.gte]: minLng });
    if (maxPrice !== undefined) where.price = ({ [Op.lte]: maxPrice });
    if (minPrice !== undefined) where.price = ({ [Op.gte]: minPrice });


    const spots = await Spot.findAll({
        include: [
            {
                model: SpotImage,
                where: { preview: true },
                required: false
            },
            {
                model: Review,
                required: false
            },
        ],
        where,
        limit,
        offset
    });

    const results = [];
    for (let spot of spots) {
        spot = spot.toJSON();
        // Get previewImage
        if (spot.SpotImages.length) {
            spot.previewImage = spot.SpotImages[0].url;
        } else {
            spot.previewImage = null;
        };
        delete spot.SpotImages;

        //Get avgRating
        if (spot.Reviews.length) {
            const ratingsSum = spot.Reviews.reduce((sum, review) => {
                return sum += review.stars;
            }, 0);
            spot.avgRating = ratingsSum / spot.Reviews.length;
        } else spot.avgRating = 0;
        delete spot.Reviews;
        results.push(spot)
    }

    res.json({
        Spots: results,
        page,
        size
     });

    // res.json(spots)


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
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });
        } else {
            bookings = await spot.getBookings({
                attributes: ['spotId', 'startDate', 'endDate']
            });
        }

        res.json({ Bookings: bookings });
    });

router.post('/:spotId/bookings', restoreUser, requireAuth, isSpotExisting, isNotSpotOwner, validateBooking, validateDate,
    async (req, res) => {
        const { spot, user } = req;
        const { startDate, endDate } = req.body;
        const booking = await spot.createBooking({
            userId: user.id,
            startDate,
            endDate
        })
        res.json(booking);
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

    const owner = await spot.getUser({
        attributes: ['id', 'firstName', 'lastName']
    })

    spot = spot.toJSON();
    spot.SpotImages = spotImages;
    spot.Owner = owner;
    res.json(spot);

})

module.exports = router;
