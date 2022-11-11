const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    type: { type: String },
    client_id: { type: String },
    client_secret: { type: String },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("token", tokenSchema);
