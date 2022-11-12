const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseSchema = require("./baseSchema");
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    feedback: String,
  },
  opts
);
schema.add(baseSchema);

module.exports = mongoose.model("Template", schema);
