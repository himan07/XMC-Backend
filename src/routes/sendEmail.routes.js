const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/sendEmail.controller");

router.post("/", sendEmail);

module.exports = router;
