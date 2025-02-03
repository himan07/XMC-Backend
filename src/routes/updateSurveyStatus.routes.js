const express = require("express");
const router = express.Router();

const { updateSurveyApprovalRejectionStatus } = require("../controllers/SurveyApproval.controller");

router.put("/", updateSurveyApprovalRejectionStatus);

module.exports = router;
