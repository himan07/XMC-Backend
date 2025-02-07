const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

exports.loginUser = async (req, res) => {
  const userEmail = "himanshu.yadav@market-xcel.com";
  const userpassword = "xmc@marketXcel123";
  const SECRET_KEY = process.env.SECRET_KEY;

  const ERROR_MESSAGES = {
    missingFields: "Email and password are required.",
    invalidCredentials: "Invalid email or password.",
    internalError: "Internal Server error",
  };

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: ERROR_MESSAGES.missingFields });
    }

    if (email === userEmail && password === userpassword) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

      return res
        .status(200)
        .json({ message: "Login successful", email, token });
    } else {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.invalidCredentials });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: ERROR_MESSAGES.internalError, error: error.message });
  }
};
