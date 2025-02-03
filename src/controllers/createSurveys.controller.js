const personalInfoModel = require("../models/personalnfo.model");

exports.surveys = async (req, res) => {
  const { uid } = req.headers;
  const { surveys } = req.body;

  try {
    if (!uid) {
      return res
        .status(400)
        .json({ message: "User UUID (uid) is required in the headers" });
    }

    if (!surveys) {
      return res.status(400).json({ message: "Survey data must be an object" });
    }
    const user = await personalInfoModel.findOne({ uuid: uid });
    const filterSurveys = Object.fromEntries(
      Object.entries({ ...user._doc.surveys }).filter(
        ([key, value]) => value.survey_status === ""
      )
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the provided UUID" });
    }

    user.surveys = surveys;

    return res.status(200).json({
      message: "Surveys updated successfully",
      updatedSurveys: filterSurveys,
    });
  } catch (error) {
    console.error("Error updating surveys:", error);
    return res.status(500).json({
      message: "An error occurred while updating the surveys",
      error: error.message,
    });
  }
};
