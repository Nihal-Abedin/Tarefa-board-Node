class AppError extends Error {
  constructor(message, statusCode, messageArray = []) {
    super(message);

    this.statusCode = statusCode;
    this.messageArray = messageArray;
    this.message = message;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
