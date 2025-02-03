const mongoose = require("mongoose");

const RedemptionSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  requestDate: {
    type: String,
    required: true,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  redemptionStatus: {
    approve: {
      type: Boolean,
      require: false,
    },
    reject: {
      type: Boolean,
      message: "",
      require: false,
    },
  },
  redeem:{
    type:String,
    message:"redemption"
  }
});

const Redemption = mongoose.model("redemption", RedemptionSchema);

module.exports = Redemption;
