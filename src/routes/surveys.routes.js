const express = require("express");
const router = express.Router();

const { surveys } = require("../controllers/createSurveys.controller");

router.put("/", surveys);

module.exports = router;
