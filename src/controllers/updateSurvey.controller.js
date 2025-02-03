const personalInfoModal = require("../models/personalnfo.model");

exports.updateSurveyStatus = async (req, res) => {
  try {
    const uuid = req.headers["uuid"];
    const projectCode = req.headers["project_code"];
    const { survey_status } = req.body;

    if (!uuid) {
      return res.status(400).json({
        status: "error",
        message: "UUID is required in the headers",
      });
    }

    if (!projectCode) {
      return res.status(400).json({
        status: "error",
        message: "Project code is required in the headers",
      });
    }

    if (survey_status === undefined || survey_status === null) {
      return res.status(400).json({
        status: "error",
        message: "Survey status is required in the request body",
      });
    }
    
    const filter = { uuid, [`surveys.${projectCode}`]: { $exists: true } };

    const data  = await personalInfoModal.findOne(filter)

    const newData = {...data._doc, surveys:{...data._doc.surveys,[projectCode]:{...data._doc.surveys[projectCode],survey_status}}}
    
  
    const result = await personalInfoModal.findOneAndUpdate(filter, newData);

    if (!result) {
      return res.status(404).json({
        status: "error",
        message: `No survey found with project code: ${projectCode} for the provided UUID`,
      });
    }



    return res.status(200).json({
      status: "success",
      message: "Survey status updated successfully",
      data: {...result.surveys[projectCode], survey_status}, 
    });
  } catch (error) {
    console.error("Error updating survey status:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
