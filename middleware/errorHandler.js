function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHabdler(err, req, res, netx) {
  res.status(500),
    json({
      message: err.message,
      stack: err.stack,
    });
}

module.exports = { logErrors, errorHabdler };
