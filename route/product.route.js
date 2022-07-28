const express = require("express");

// Controllers
const {
  createProduct,
  getAllProduct,
  getIDProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

const {
  createCategorie,
  getAllCategory,
  updateIdCategory,
} = require("../controller/categorie.controller");

// Middlewares
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const { ProductIDExists } = require("../middlewares/products.middleware");
const {
  categorieExists,
  categorieExistsProduct,
} = require("../middlewares/categorie.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
//const { OrderExists } = require("../middlewares/order.middleware");

const ProductRouter = express.Router();

ProductRouter.use(protectSession);
ProductRouter.post("/", categorieExistsProduct, createProduct);
ProductRouter.get("/categories", getAllCategory);
//ProductRouter.post("/login", login);

ProductRouter.post("/categories", createCategorie);
ProductRouter.patch("/categories/:id", categorieExists, updateIdCategory);

ProductRouter.get("/", getAllProduct);
//ProductRouter.get("/orders", getAllUsersOrder);
//ProductRouter.get("/:id", ProductIDExists, getIDProduct);

ProductRouter.use("/:id", ProductIDExists)
  .route("/:id")
  .get(getIDProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = { ProductRouter };
