const path = require("path");

// Models
const { User } = require("../models/users.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");

const renderIndex = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  //?is helped by address search in the template engine
  res.status(200).render("index", {
    //? File I intend to render 'index'
    title: "Rendered User",
    users,
  });
});

module.exports = { renderIndex };
