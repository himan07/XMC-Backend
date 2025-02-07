const express = require("express");
const { createPersonalInfo } = require("../controllers/personalnfo.controller");
const router = express.Router();

router.route("/").post(createPersonalInfo);

module.exports = router;
