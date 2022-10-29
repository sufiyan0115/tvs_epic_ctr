const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    document: String,
  },
  opts
);
module.exports = mongoose.model("Template", schema);
