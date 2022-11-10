const DraftTemplate = require("../models/draftTemplate");
const ValidationException = require("../exceptions/ValidationException");
const UnauthorisedException = require("../exceptions/UnauthorisedException");
const findOrCreateTemplate = async (id, user) => {
  try {
    if (id == null) return;
    const document = await DraftTemplate.findOne({ id });
    if (document && !document.owner.equals(user._id))
      throw new UnauthorisedException({ message: "You don't own this one" });
    if (document) return document;
    const curTime = Date.now();
    const newTemplate = {
      id,
      data: " ",
      name: "Untitled",
      creationTime: curTime,
      lastUpdated: curTime,
      owner: user._id,
    };
    return await DraftTemplate.create(newTemplate);
  } catch (err) {
    throw new ValidationException({ message: err.message });
  }
};

module.exports = findOrCreateTemplate;
