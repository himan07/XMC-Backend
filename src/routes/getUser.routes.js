const express = require("express");
const {getUserByEmail} =  require("../controllers/getuser.controller")
const router = express.Router();


router.route("/").get(getUserByEmail)

module.exports = router;
