const personalInfos = require("../models/personalnfo.model");

exports.updateUserVerificationStatus = async (req, res) => {
  const email = req.headers.email.trim();

  if (!email)
    return res
      .status(400)
      .json({ message: "Email is required in the headers." });

  const { approve, reject, message } = req.body;
  if (approve === undefined && reject === undefined) {
    return res
      .status(400)
      .json({ message: "Either approve or reject must be provided." });
  }

  const updatedStatus = {};
  if (approve !== undefined)
    updatedStatus["userVerificationStatus.approve"] = approve;
  if (reject !== undefined)
    updatedStatus["userVerificationStatus.reject"] = reject;
 if(reject !== undefined)
    updatedStatus["userVerificationStatus.message"] = message

  try {
    const updatedUser = await personalInfos.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: updatedStatus },
      { new: true }
    );

    console.log(updatedUser);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });

    res
      .status(200)
      .json({
        message: "User verification status updated successfully.",
        data: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while updating the status.",
        error: error.message,
      });
  }
};
