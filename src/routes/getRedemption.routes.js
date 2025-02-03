const express = require("express");
const router = express.Router();

const { getRedemptionData } = require("../controllers/getRedemption.controller");

router.get("/", getRedemptionData);

module.exports = router;
