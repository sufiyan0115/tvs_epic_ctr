const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const baseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creationTime: {
      type: Date,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
    },
  },
  opts
);
module.exports = baseSchema;
