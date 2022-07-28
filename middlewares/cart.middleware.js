// Models
const { Cart } = require("../models/carts.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const cartExists = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const id = sessionUser.id;
  const carts = await Cart.findOne({ where: { userId: id, status: "active" } });

  if (!carts) {
    const newCart = await Cart.create({ userId: id });
    res.status(201).json({
      status: "succes",
      newCart,
    });
    console.log("Se creo");
    req.carts = carts;
    next();
  } else {
    console.log("Si Existe");
    req.carts = carts;
    next();
  }
});

module.exports = { cartExists };
