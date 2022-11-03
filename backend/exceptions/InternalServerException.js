const BaseException = require("../core/BaseException");

class InternalServerException extends BaseException {
  constructor({ errors, message, name, critical }) {
    super({
      message:
        message ||
        "This is probably an error on the server" +
          " and has nothing to do with your request.",
      name: "Internal server error",
      critical: critical || false,
      errors: errors || [],
      code: 500,
    });
  }
}

module.exports = InternalServerException;
