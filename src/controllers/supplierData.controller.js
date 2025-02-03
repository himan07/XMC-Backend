const SupplierData = require("../models/personalnfo.model");

exports.getSupplierData = async (req, res) => {
  const authHeader = req.headers.authorization;
  const uuid = req.headers.uuid;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Bearer token" });
  }

  // if (!uuid) {
  //   return res.status(400).json({ success: false, message: "UUID is required" });
  // }

  const token = authHeader.split(" ")[1];

  if (!token || token === "invalid_token_example") {
    return res
      .status(403)
      .json({ success: false, message: "Authentication failed" });
  }

  try {
    const supplier = await SupplierData.findOne({ uuid });
    const allData = await SupplierData.find();
    if (!allData) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No data found.",
        });
    }
    res
      .status(200)
      .json({ success: true, data: supplier ? supplier : allData });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching supplier data",
        error: error.message,
      });
  }
};
