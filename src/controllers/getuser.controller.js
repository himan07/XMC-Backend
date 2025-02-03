const CreateUser = require("../models/personalnfo.model");

exports.getUserByEmail = async (req, res) => {
  try {
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

    const email = req.headers.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email ID is required in headers",
      });
    }

    const user = await CreateUser.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};
