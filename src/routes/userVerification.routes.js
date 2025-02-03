const express = require("express");
const { updateUserVerificationStatus } = require("../controllers/userVerifiation.controller");
const router = express.Router();

router.put("/", updateUserVerificationStatus);

module.exports = router;
