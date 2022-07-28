const express = require("express");

// Controllers
const {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
  getProductMe,
  getAllUsersOrder,
} = require("../controller/user.controller");

// Middlewares
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
//const { OrderExists } = require("../middlewares/order.middleware");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidators, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/", getAllUsers);
usersRouter.get("/me", getProductMe);
usersRouter.get("/orders", getAllUsersOrder);

usersRouter
  .use("/:id", userExists)
  .route("/:id")
  //.get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
