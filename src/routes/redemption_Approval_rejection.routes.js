const express = require("express");
const router = express.Router();

const { ApproveRejectRedemption } = require("../controllers/redemptionApprovalRejection.controller");

router.put("/", ApproveRejectRedemption);

module.exports = router;
