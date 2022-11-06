const Template = require("../models/template");
const ValidationException = require("../exceptions/ValidationException");
const findOrCreateTemplate = async (id) => {
  try {
    if (id == null) return;
    const document = await Template.findOne({ id });
    if (document) return document;
    return await Template.create({ id, data: " " });
  } catch (err) {
    throw new ValidationException({ message: "Validation Error on Template" });
  }
};

module.exports = findOrCreateTemplate;
