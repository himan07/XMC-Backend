const express = require("express");
const {getDashboardData} =  require("../controllers/getDashboardData.controller")
const router = express.Router();


router.route("/").get(getDashboardData)

module.exports = router;
