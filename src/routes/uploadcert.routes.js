const express = require("express");
const {uploadCertificate} = require("../controllers/uploadcert.controller")
const router = express.Router();


router.route("/").post(uploadCertificate)

module.exports = router;
