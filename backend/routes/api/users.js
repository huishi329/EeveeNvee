const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your last name'),
  handleValidationErrors
];

router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;

  try {
    const user = await User.signup({ email, username, password, firstName, lastName });

    setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName,
      lastName,
      email,
      username
    });

  } catch (e) {
    const errors = e.errors.reduce((errors, errObj) => {
      errors[errObj.path] = errObj.message;
      return errors
    }, {});
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors
    });
  }

});

module.exports = router;
