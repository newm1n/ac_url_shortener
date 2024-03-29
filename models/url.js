const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  url_shortened: {
    type: String,
  },
});
module.exports = mongoose.model("URL", urlSchema);
