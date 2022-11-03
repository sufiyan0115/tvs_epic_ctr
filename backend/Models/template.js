const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    document: {
      type: String,
      required: true,
    },
  },
  opts
);
module.exports = mongoose.model("Template", schema);
