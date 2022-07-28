const express = require("express");

// Controllers
const {
  AddProduct,
  getAllcartProduct,
  getAllcart,
  UpdateCart,
  DeleteCart,
  Purchased,
} = require("../controller/cart.controller");

// Middlewares
const { cartExists } = require("../middlewares/cart.middleware");
const {
  productincartexist,
} = require("../middlewares/productInCart.middleware");
const { userExists } = require("../middlewares/users.middleware");
const {
  TotalProductID,
  priceProduct,
} = require("../middlewares/products.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
//const { OrderExists } = require("../middlewares/order.middleware");

const RouteCart = express.Router();
RouteCart.get("/", getAllcart);
RouteCart.post("/add-product", protectSession, cartExists, AddProduct);
RouteCart.patch("/update-cart", protectSession, cartExists, UpdateCart);
RouteCart.delete("/:productId", protectSession, productincartexist, DeleteCart);
RouteCart.patch("/purchase", protectSession, cartExists, Purchased);
RouteCart.get("/all", getAllcartProduct);
RouteCart.get("/oll", getAllcartProduct);
/*RouteCart.use(protectSession);

RouteCart.get("/", getAllUsers);
RouteCart.get("/me", getProductMe);
RouteCart.get("/orders", getAllUsersOrder);*/

/*RouteCart
  .use("/:id", userExists)
  .route("/:id")
  //.get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);*/

module.exports = { RouteCart };
