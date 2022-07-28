const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

// Routers
const { usersRouter } = require("./route/user.route");
const { ProductRouter } = require("./route/product.route");
const { RouteCart } = require("./route/cart.route");
const { viewsRouter } = require("./route/views.routes");

// Global err controller
const { globalErrorHandler } = require("./controller/error.controller");

// Utils
const { AppError } = require("./utils/appError.util");

// Init express app
const app = express();

// Enable incoming JSON
app.use(express.json());

//? Set template engine to use pug
app.set("view engine", "pug");
//? search address
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: "Number of requests have been exceeded",
});

app.use(limiter);

// Add security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/cart", RouteCart);
app.use("/*", viewsRouter);
/*app.use("/api/v1/meals", MealsRouter);
app.use("/api/v1/orders", OrderRouter);*/

// Handle incoming unknown routes to the server
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});
//app.use(globalErrorHandler);

module.exports = { app };
