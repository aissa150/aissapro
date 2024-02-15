const mongoose = require("mongoose");

const UrlsConfig = new mongoose.Schema(
  {
    id: { type: String, required: false },
    accessToken:{ type: String, required: false },
    refreshToken: { type: String, required: false },
    email: { type: String, required: false }
  }
);

module.exports = mongoose.model("DataDB", UrlsConfig);