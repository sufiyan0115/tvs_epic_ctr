const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };
const schema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    id:{
      type: String,
      required: true,
      unique: true
    }
  },
  opts
);
module.exports = mongoose.model("Template", schema);
