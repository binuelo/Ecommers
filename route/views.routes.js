const express = require("express");

// Controller
const { renderIndex } = require("../controller/views.controller");

const viewsRouter = express.Router();

viewsRouter.get("/*", renderIndex);

module.exports = { viewsRouter };
