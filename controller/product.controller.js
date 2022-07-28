// Models
const { Product } = require("../models/product.models");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");

//middlewares
const { ProductIDExists } = require("../middlewares/products.middleware");

const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price, categoryId, userId } = req.body;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    price,
    categoryId,
    userId,
  });

  res.status(201).json({
    status: "success",
    newProduct,
  });
});

const getAllProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findAll({ where: { status: "active" } });
  res.status(200).json({
    status: "success",
    product,
  });
});

const getIDProduct = catchAsync(async (req, res, next) => {
  const { productId } = req;
  res.status(200).json({
    status: "success",
    productId,
  });
});
const updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req;
  const { title, description, price, quantity } = req.body;
  await productId.update({ title, description, price, quantity });

  res.status(204).json({ status: "success", productId });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req;
  await productId.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});
module.exports = {
  createProduct,
  getAllProduct,
  getIDProduct,
  updateProduct,
  deleteProduct,
};
