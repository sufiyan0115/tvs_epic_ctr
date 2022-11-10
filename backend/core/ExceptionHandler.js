const InternalServerException = require("../exceptions/InternalServerException");
const BaseException = require("./BaseException");

function ExceptionHandler(E) {
  if (!E || !(E instanceof Error)) {
    throw new InternalServerException({
      message: "Invalid exception",
      critical: true,
    });
  }
  if (E instanceof BaseException) return E;
  else if (E instanceof Error) {
    return new BaseException({
      name: E.name,
      message: E.message,
      errors: [E],
      critical: true,
      thrownBy: E.stack,
    });
  }
}

module.exports = ExceptionHandler;
