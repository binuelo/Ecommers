// Models
const { Product } = require("../models/product.models");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const ProductIDExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productId = await Product.findOne({ where: { id } });
  if (!productId) {
    return next(new AppError("Product not found", 404));
  }
  req.productId = productId;
  next();
});

const TotalProductID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productId = await Product.findOne({ where: { id } });
  if (!productId) {
    return next(new AppError("Product not found", 404));
  } else {
    console.log(`quantity ${productId.quantity}`);
  }
  req.productId = productId;
  next();
});

const priceProduct = catchAsync(async (req, res, next) => {
  const { productId } = req;

  const { id } = req.params;
  const productI = await Product.findOne({ where: { id: productId } });
  console.log(productI);
  if (!productI) {
    return next(new AppError("Product not found", 404));
  }
  req.productId = productI;
  next();
});

module.exports = { ProductIDExists, TotalProductID, priceProduct };
