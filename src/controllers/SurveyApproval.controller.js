const personalInfoModel = require("../models/personalnfo.model");

exports.updateSurveyApprovalRejectionStatus = async (req, res) => {
  const { uuid, project_code } = req.headers;
  const { approve, reject, message } = req.body;

  try {
    if (!uuid) {
      return res
        .status(400)
        .json({ message: "User UUID (uuid) is required in the headers." });
    }

    if (!project_code) {
      return res
        .status(400)
        .json({ message: "Project code is required in the request headers." });
    }

    if (approve === undefined && reject === undefined) {
      return res
        .status(400)
        .json({ message: "Either approve or reject must be provided." });
    }

    const updateFields = {};
    if (approve !== undefined)
      updateFields[`surveys.${project_code}.surveyApprovalStatus.approve`] =
        approve;
    if (reject !== undefined)
      updateFields[`surveys.${project_code}.surveyApprovalStatus.reject`] =
        reject;
    if (message !== undefined)
      updateFields[`surveys.${project_code}.surveyApprovalStatus.message`] =
        message;

    const user = await personalInfoModel.findOneAndUpdate(
      { uuid: uuid },
      { $set: updateFields },
      { new: true }
    );

    if (!user || !user.surveys || !user.surveys[project_code]) {
      return res.status(404).json({
        message: `Survey with project code ${project_code} not found for the user.`,
      });
    }

    const updatedSurvey = user.surveys[project_code];

    return res.status(200).json({
      message: "Survey approval/rejection status updated successfully.",
      updatedSurvey,
    });
  } catch (error) {
    console.error("Error updating survey approval status:", error);
    return res.status(500).json({
      message: "An error occurred while updating the survey approval status.",
      error: error.message,
    });
  }
};
