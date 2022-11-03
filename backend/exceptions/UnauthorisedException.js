const BaseException = require("../core/BaseException");

class UnauthorisedException extends BaseException {
  constructor({ message, name, thrownBy, critical }) {
    super({
      message: message || "This user is unauthorised to access this route",
      code: 401,
      thrownBy: thrownBy || "Authentication handler",
      critical: critical || true,
      name: name || "Authentication error",
    });
  }
}

module.exports = UnauthorisedException;
