const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routers = require("./routers");

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

module.exports = app;
