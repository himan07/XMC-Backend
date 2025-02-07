const express = require("express");
const {CreateUser}  = require("../controllers/createuser.controller")
const router = express.Router();


router.route("/").post(CreateUser)

module.exports = router;
