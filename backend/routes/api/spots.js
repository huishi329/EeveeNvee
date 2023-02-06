const express = require('express')
const router = express.Router();
const { Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { validateBooking, validateDate, validateReview } = require('../../utils/reqValidation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../aws')
const { Op } = require('sequelize');

const validateSpot = [
    check('street')
        .exists({ checkFalsy: true })
        .withMessage('Street street is required'),
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
        .withMessage('Price per day is required')
        .isFloat({ min: 0 })
        .withMessage('Price needs to be non-negative'),
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

const isSpotExisting = async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    req.spot = spot;
    next();
}

const isNotSpotOwner = (req, res, next) => {
    const { spot, user } = req;

    if (spot.ownerId === user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };
    next();
}

const isSpotOwner = (req, res, next) => {
    const { spot, user } = req;

    if (spot.ownerId !== user.id) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    };
    next();
}

router.post('/', restoreUser, requireAuth, validateSpot,
    async (req, res) => {
        const { street, city, state, country, lat, lng, name, description, price } = req.body;
        const { user } = req;

        const spot = await Spot.create({
            ownerId: user.id,
            street, city, state, country, lat, lng, name, description, price
        });
        res.status(201).json(spot);
    })

router.put('/:spotId', requireAuth, isSpotExisting, isSpotOwner, validateSpot, async (req, res) => {
    const { street, city, state, country, lat, lng, name, description, price } = req.body;
    const { user, spot } = req;

    spot.set({
        street, city, state, country, lat, lng, name, description, price
    });

    await spot.save();

    res.json(spot);
});

router.delete('/:spotId', requireAuth, isSpotExisting, isSpotOwner,
    async (req, res) => {
        const { spot } = req;

        await spot.destroy();

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    })

router.post('/:spotId/images', requireAuth, isSpotExisting, isSpotOwner, singleMulterUpload("image"),
    async (req, res) => {
        const { preview } = req.body;
        const { spot } = req;
        const url = await singlePublicFileUpload(req.file);

        const spotImage = await spot.createSpotImage({
            url,
            preview
        });
        res.status(201).json({
            id: spotImage.id,
            url,
            preview
        });
    }
)

// router.post('/', requireAuth, singleMulterUpload("image"), async (req, res) => {
//     const { preview } = req.body;
//     const { user } = req;

//     const url = await singlePublicFileUpload(req.file);
//     const spotImage = SpotImage.create({
//         ownerId: user.id,
//         preview,
//         url
//     });

//     res.status(201).json(spotImage);
// })

router.get('/', ValidateSpotQuery, async (req, res, next) => {
    const where = {};
    const { maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
    let { page, size } = req.query;

    page = page === undefined ? 1 : parseInt(page);
    size = size === undefined ? 20 : parseInt(size);

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

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i].toJSON();
        spots[i] = spot;

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
    }

    res.json({
        Spots: spots,
        page,
        size
    });
})

router.get('/current', requireAuth, async (req, res) => {
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

router.get('/:spotId/reviews', isSpotExisting, async (req, res) => {
    const { spot } = req;

    let reviews = await spot.getReviews({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
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

router.get('/:spotId/bookings', requireAuth, isSpotExisting,
    async (req, res) => {
        const { user, spot } = req;

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

router.post('/:spotId/bookings', requireAuth, isSpotExisting, isNotSpotOwner, validateBooking, validateDate,
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

router.post('/:spotId/reviews', requireAuth, isSpotExisting, validateReview, async (req, res) => {
    const { user, spot } = req;

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
});

router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                required: false
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
                required: false
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                required: false
            },
        ],
    });

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    spot = spot.toJSON();

    // Add avgRating and numReviews
    spot.numReviews = spot.Reviews.length
    if (spot.numReviews) {
        const ratingsSum = spot.Reviews.reduce((sum, review) => {
            return sum += review.stars;
        }, 0);
        spot.avgStarRating = ratingsSum / spot.numReviews;
    } else spot.avgStarRating = 0;
    delete spot.Reviews;

    // Rename User to Owner
    spot.Owner = spot.User;
    delete spot.User;

    res.json(spot);
})

module.exports = router;
