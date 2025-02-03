const Redemption = require("../models/Redemption.modal");

const getRedemptionData = (req, res) => {
  try {
    const uuid = req.headers.uuid?.trim();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message:
          "Please provide a valid Bearer token in the Authorization header",
      });
    }

    const cookies = req.headers.authorization;
    const cookieToken = cookies.split(" ")[1];
    const headerToken = authHeader.split(" ")[1];

    if (!cookieToken) {
      return res.status(401).json({
        success: false,
        message: "Session token is missing in cookies",
      });
    }

    if (headerToken !== cookieToken) {
      return res.status(403).json({
        success: false,
        message: "Invalid session: Tokens do not match",
      });
    }

    if (uuid) {
      Redemption.find({ userId: uuid })
        .then((userData) => {
          if (userData.length === 0) {
            return res
              .status(200)
              .json({ message: "No data found for this UUID." });
          }
          res.status(200).json({ data: userData });
        })
        .catch((error) => {
          console.log(error);

          res.status(500).json({ message: error.message });
        });
    } else {
      Redemption.find({})
        .then((allData) => {
          res.status(200).json({ data: allData });
        })
        .catch((error) => {
          res.status(500).json({ message: "Internal Server Error" });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRedemptionData,
};
