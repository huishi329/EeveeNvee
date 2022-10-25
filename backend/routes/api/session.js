const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required.'),
    handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    setTokenCookie(res, user);

    const { id, firstName, lastName, email, username } = user;

    return res.json({
        id,
        firstName,
        lastName,
        email,
        username
    });
});


// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

// Restore session user
router.get('/', restoreUser, requireAuth, (req, res) => {
    const { user } = req;
    if (user) {
        const { id, firstName, lastName, email, username } = user.toSafeObject()
        return res.json({
            id,
            firstName,
            lastName,
            email,
            username
        });
    } else return res.json({});
});

module.exports = router;
