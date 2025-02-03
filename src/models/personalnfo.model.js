const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  privacyPolicy: {
    type: Boolean,
    required: true,
  },
  userVerificationStatus: {
    approve: {
      type: Boolean,
      required: false,
    },
    reject: {
      type: Boolean,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  uuid: {
    type: String,
    required: true,
  },
  surveys: {
    type: Object,
    required: false,
  },
});

const personalInfoModal = mongoose.model("personalInfo", personalInfoSchema);

module.exports = personalInfoModal;
