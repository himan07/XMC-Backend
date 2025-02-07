const personalInfo = require("../models/personalnfo.model");
const certificateUrl = require("../models/uploadcert.model");

const getDashboardData = async (req, res) => {
  try {
    const personalInfoData = await personalInfo.find();
    const certificateUrlData = await certificateUrl.find();

    if (!personalInfoData || personalInfoData.length === 0) {
      return res.status(404).json({ error: "No personal information found." });
    }

    const enrichedData = personalInfoData.map((info) => {
      const userCertificates = certificateUrlData
        .filter((cert) => cert.email === info.email)
        .map((cert) => cert.medicalLicense);

      return {
        ...info.toObject(),
        certificateUrl: userCertificates.length > 0 ? userCertificates : null,
      };
    });

    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: enrichedData });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

module.exports = { getDashboardData };
