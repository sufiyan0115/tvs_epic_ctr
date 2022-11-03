const BaseException = require("../core/BaseException");

class BadRequestException extends BaseException {
  constructor({ errors, message, name, critical }) {
    super({
      message: message || "Bad request exception",
      errors: errors || [],
      name: name || "Bad request",
      critical: critical || true,
      code: 400,
    });
  }
}

module.exports = BadRequestException;
