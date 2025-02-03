const express = require("express");
const {getSupplierData} =  require("../controllers/supplierData.controller")
const router = express.Router();


router.route("/").get(getSupplierData)

module.exports = router;
