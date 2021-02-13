"use strict";

const { StatusCodes } = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  let errorCode = StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

exports.internalServerError = (req, res) => {
  let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is taking a nap!`);
};
