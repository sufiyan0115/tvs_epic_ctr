const BaseException = require("../core/BaseException");

class ResourceNotFoundException extends BaseException {
  constructor({ message, resourceName }) {
    super({
      message:
        message || "The requested resource " + resourceName + " was not found.",
      code: 404,
      name: "Resource not found",
      critical: false,
    });
  }
}
module.exports = ResourceNotFoundException;
