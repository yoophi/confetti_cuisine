"use strict";

const { StatusCodes } = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
  console.log(error.stack);
  next(error);
};

exports.respondNoResourceFound = (req, res) => {
  let errorCode = StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (req, res) => {
  let errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
