const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      index: true,
    },
    version: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
    },
  },
  opts
);
module.exports = mongoose.model("ArchivedTemplate", schema);
