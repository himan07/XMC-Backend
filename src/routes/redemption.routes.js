const express = require("express");
const router = express.Router();

const { createRedemption } = require("../controllers/redemption.controller");

router.post("/", createRedemption);

module.exports = router;
