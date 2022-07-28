//Models
const { Cart } = require("../models/carts.model");
const { ProductInCart } = require("../models/productsInCart.model");
const { Product } = require("../models/product.models");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const AddProduct = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { carts } = req;
  const idcart = carts.id;

  //! Aqui /**/
  //! Cambiossss------------------------------------------------------------
  const productInventory = await Product.findOne({ where: { id: productId } });
  const QuantityInventory = productInventory.quantity;

  const productCa = await ProductInCart.findOne({
    where: { productId },
  });
  /*  if ((productInventory.id === productCa.productId) === true) {
    res.status(201).json({
      message: "Product Exist  ",
    });
    next();
  } //!me genera Error marcandome como null productID y quantity
  /? Si Valida pero genera erro al querer agregar nuevo Producto al CarID
 */

  if (QuantityInventory > quantity) {
    /* const TTInventary = QuantityInventory - quantity;

    await Product.update(
      {
        quantity: TTInventary,
      },
      {
        // Clause
        where: {
          id: productId,
        },
      }
    );*/
    const car = await ProductInCart.create({
      cartId: idcart,
      productId,
      quantity,
    });
    res.status(201).json({
      status: "success",
      car,
    });
  } else if (QuantityInventory < quantity) {
    res.status(201).json({
      message: "The total stock is less: " + QuantityInventory,
    });
    next();
  }
});

const getAllcartProduct = catchAsync(async (req, res, next) => {
  const productcart = await ProductInCart.findAll();
  res.status(200).json({
    status: "success",
    productcart,
  });
});

const getAllcart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findAll();
  res.status(200).json({
    status: "success",
    cart,
  });
});

const UpdateCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const productInventory = await Product.findOne({ where: { id: productId } });
  const QuantityInventory = productInventory.quantity;

  const productCa = await ProductInCart.findOne({
    where: { productId },
  });
  if (QuantityInventory > quantity) {
    const car = await ProductInCart.update(
      {
        productId,
        quantity,
      },
      {
        // Clause
        where: {
          id: productId,
        },
      }
    );
    if (quantity === 0) {
      const car = await ProductInCart.update(
        {
          status: "removed",
        },
        {
          // Clause
          where: {
            id: productId,
          },
        }
      );
    } else if (quantity > 0) {
      const car = await ProductInCart.update(
        {
          status: "active",
        },
        {
          // Clause
          where: {
            id: productId,
          },
        }
      );
    }
    res.status(201).json({
      status: "success",
      car,
    });
  } else if (QuantityInventory < quantity) {
    res.status(201).json({
      message: "The total stock is less: " + QuantityInventory,
    });
    next();
  }
});

const DeleteCart = catchAsync(async (req, res, next) => {
  const { productincartid } = req;
  const productInventory = await Product.findOne({
    where: { id: productincartid.productId },
  });
  const QuantityInventory = productInventory.quantity;
  const TTInventary = QuantityInventory + productincartid.quantity;

  const car = await productincartid.update(
    {
      quantity: 0,
      status: "removed",
    },
    {
      // Clause
      where: {
        productId: productincartid.productId,
      },
    }
  );
  console.log(productincartid.productId);

  res.status(201).json({
    status: "success",
    car,
  });
});

const Purchased = catchAsync(async (req, res, next) => {
  const { carts } = req;
  const idcart = carts.id;

  await ProductInCart.update(
    {
      status: "purchased",
    },
    {
      // Clause
      where: {
        cartId: idcart,
        status: "active",
      },
    }
  );
  const ttProduct = await ProductInCart.findAll({
    include: [{ model: Product, attributes: ["price", "quantity"] }],
    where: { status: "purchased" },
  });
  console.log(ttProduct.price);
  res.status(201).json({ status: "success", ttProduct });
});
module.exports = {
  AddProduct,
  getAllcartProduct,
  getAllcart,
  UpdateCart,
  DeleteCart,
  Purchased,
};
