const express = require("express");
const router = express.Router();

const { updateSurveyStatus } = require("../controllers/updateSurvey.controller");

router.put("/", updateSurveyStatus);

module.exports = router;
