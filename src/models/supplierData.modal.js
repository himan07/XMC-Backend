const mongoose = require("mongoose");

const supplierDataSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  cpi: {
    type: String,
    required: true,
  },
  project_loi: {
    type: String,
    required: true,
  },
  project_code: {
    type: String,
    required: true,
    unique: true,
  },
  live_url: {
    type: String,
    required: true,
    unique: true,
  },
  survey_status: {
    type: String,
    default: null,
  },
  uuid: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  surveyApprovalStatus: {
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
});

supplierDataSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const SupplierData = mongoose.model("SupplierData", supplierDataSchema);

module.exports = SupplierData;
