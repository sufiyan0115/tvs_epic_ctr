const Template = require("../models/template");
const ApprovedTemplate = require("../models/approvedTemplate");
const ValidationException = require("../exceptions/ValidationException");
const UnauthorisedException = require("../exceptions/UnauthorisedException");
const findOrCreateTemplate = async (id, user) => {
  try {
    if (id == null) return;
    const document = await Template.findOne({ id });
    if (document && !document.owner.equals(user._id))
      throw new UnauthorisedException({ message: "You don't own this one" });
    if (document) return document;
    const exists = await ApprovedTemplate.findOne({ id });
    if (exists)
      throw new ValidationException({
        message: "This template is already approved, use a different id",
      });
    const curTime = Date.now();
    const newTemplate = {
      id,
      data: " ",
      name: "Untitled",
      creationTime: curTime,
      lastUpdated: curTime,
      owner: user._id,
      status: "Draft",
    };
    return await Template.create(newTemplate);
  } catch (err) {
    throw new ValidationException({ message: err.message });
  }
};

module.exports = findOrCreateTemplate;
