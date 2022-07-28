const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError.util");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("username").notEmpty().withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain letters and numbers"),
  //.isIn(["admin", "normal"])
  //.withMessage("add user (admin or normal)"),
  checkResult,
  body("role").notEmpty().withMessage("Must provide a valid email"),
];
const createRestaurantValidators = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("address").notEmpty().withMessage("add an address"),
  body("rating").isNumeric().withMessage("add a number ( 1 a 5)"),
];
const createMealsValidators = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("price").notEmpty().isNumeric().withMessage("add  product Price "),
];

const createOrderValidators = [
  body("mealId").notEmpty().isNumeric().withMessage("add mealId"),
  body("quantity").notEmpty().isNumeric().withMessage("add quantity"),
];

const createReviewsValidators = [
  body("comment").notEmpty().isNumeric().withMessage("add mealId"),
  body("ranting").notEmpty().isNumeric().withMessage("add quantity"),
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createOrderValidators,
  createMealsValidators,
  createReviewsValidators,
};
