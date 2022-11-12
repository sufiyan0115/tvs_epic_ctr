const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseSchema = require("./baseSchema");
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  opts
);
schema.add(baseSchema);
module.exports = mongoose.model("ApprovedTemplate", schema);
