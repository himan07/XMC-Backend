const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  medicalLicense: {
    type: String,
    required: true,
  },
  personalId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const certificate = mongoose.model("certificates", certificateSchema);

module.exports = certificate;
