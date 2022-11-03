const BaseException = require("../core/BaseException");

class ValidationException extends BaseException {
  constructor({ message, name, errors }) {
    super({
      message: message || "Some validation error occurred.",
      name: name || "Validation error",
      code: 400,
      errors: errors || [],
    });
  }
}

module.exports = ValidationException;
