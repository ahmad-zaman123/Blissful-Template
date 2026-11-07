const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let status = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  let message = err.message || "Server error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    status = 400;
    message = "Invalid id";
  }

  // Unexpected errors can carry database or library details, so only a generic message leaves the server.
  if (status >= 500 && !err.statusCode) {
    console.error(err);
    message = "Server error";
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
