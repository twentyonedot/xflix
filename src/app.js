const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routers = require("./routers");
const ApiError = require("./utils/ApiError");

const app = express();

// *Parses json request body
app.use(express.json());

// *Enables CORS
app.use(cors());
app.options("*", cors());

// *parses urlencoded request body
app.use(express.urlencoded({ extended: true }));

// *API router
app.use("/v1", routers);

// *send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
