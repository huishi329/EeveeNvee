const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
// const handleValidationErrors = (req, _res, next) => {
//   const validationErrors = validationResult(req);

//   if (!validationErrors.isEmpty()) {
//     const errors = validationErrors
//       .array()
//       .map((error) => `${error.msg}`);

//     const err = Error('Bad request.');
//     err.errors = errors;
//     err.status = 400;
//     err.title = 'Bad request.';
//     next(err);
//   }
//   next();
// };

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().reduce((errors, errObj) => {
      errors[errObj.param] = errObj.msg;
      return errors;
    }, {})
    res.status(400).json({
      message:"Validation error",
      statusCode: 400,
      errors
    });
  }
  next();
};

module.exports = {
  handleValidationErrors
};
