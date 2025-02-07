const Redemption = require("../models/Redemption.modal");

const generateRequestId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
  return `MXR${randomDigits}`;
};

const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

exports.createRedemption = async (req, res) => {
  try {
    const userId = req.headers.uuid?.trim();
    if (!userId) {
      return res
        .status(400)
        .json({ message: "UserId is required in the header" });
    }

    const requestId = generateRequestId();
    const { country, requestedAmount, upiId } = req.body;

    if (!country || !requestedAmount || !upiId) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided in the body" });
    }

    const requestDate = getFormattedDate();

    const newRedemptionBody = {
      ...req.body,
      requestId,
      requestDate,
    };

    const newRedemption = await Redemption.create(newRedemptionBody);
    res.status(201).json({
      message: "Redemption request created successfully",
      data: newRedemption,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the redemption request",
      error: error.message,
    });
  }
};
