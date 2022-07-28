// Models
const { Categorie } = require("../models/categories.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const categorieExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const categorie = await Categorie.findOne({ where: { id } });

  if (!categorie) {
    return next(new AppError("categorie not found", 404));
  }

  req.categorie = categorie;
  next();
});
const categorieExistsProduct = catchAsync(async (req, res, next) => {
  const { categoryId } = req.body;
  console.log(categoryId);
  const categori = await Categorie.findOne({ where: { id: categoryId } });
  console.log(categori);

  if (!categori) {
    return next(new AppError("categorie not found", 404));
  }

  req.categori = categori;
  next();
});

module.exports = { categorieExists, categorieExistsProduct };
