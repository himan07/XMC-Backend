const Redemption = require("../models/Redemption.modal");

exports.ApproveRejectRedemption = async (req, res) => {
  const transcationId = req.headers?.requestid;
  

  if (!transcationId) {
    return res
      .status(400)
      .json({ message: "Transaction id is required in the headers." });
  }

  const { approve, reject, message } = req.body;

  if (approve === undefined && reject === undefined) {
    return res
      .status(400)
      .json({ message: "Either approve or reject must be provided." });
  }

  const updatedStatus = {};

  if (approve !== undefined) {
    updatedStatus["redemptionStatus.approve"] = approve;
  }
  if (reject !== undefined) {
    updatedStatus["redemptionStatus.reject"] = reject;
  }
  if (reject !== undefined) {
    updatedStatus["surveyApprovalStatus.message"] = message;
  }

  try {
    const redemptions = await Redemption.findOneAndUpdate(
      { requestId: transcationId },
      { $set: updatedStatus },
      { new: true }
    );

    if (!redemptions) {
      return res.status(404).json({ message: "Survey not found." });
    }

    res.status(200).json({
      message: "User verification status updated successfully.",
      data: redemptions,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the status.",
      error: error.message,
    });
  }
};
