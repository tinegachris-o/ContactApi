const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      
    case constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      
    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      
    case constants.SERVER_ERROR:
      res.json({
        title: "Internal server error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
        res.json({
            title: "Internal Server Error",
            message: err.message,
            stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
          });
      break;
  }
};
module.exports = errorHandler;
