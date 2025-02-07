const personalInfoModal = require("../models/personalnfo.model");

exports.getSupplierData = async (req, res) => {
  const authHeader = req.headers.authorization;
  const uuid = req.headers.uuid;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Bearer token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "invalid_token_example") {
    return res
      .status(403)
      .json({ success: false, message: "Authentication failed" });
  }

  try {
    let supplier;
    if (uuid) {
      supplier = await personalInfoModal.findOne({ uuid });
    }

    if (supplier) {
      return res
        .status(200)
        .json({ success: true, data: supplier });
    }

    const allData = await personalInfoModal.find();
    if (!allData || allData.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No data found.",
        });
    }

    res
      .status(200)
      .json({ success: true, data: allData });
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
