// Models
const { ProductInCart } = require("../models/productsInCart.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const productincartexist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const productincartid = await ProductInCart.findOne({ where: { productId } });

  if (!productincartid) {
    return next(new AppError("ProductInCart not found", 404));
  }
  req.productincartid = productincartid;
  next();
});

module.exports = { productincartexist };
