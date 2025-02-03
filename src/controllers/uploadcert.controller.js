const multer = require("multer");
const minioClient = require("../../minio.config");
const Image = require("../models/uploadcert.model");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "medicalLicense" }, { name: "personalId" }]);

exports.uploadCertificate = (req, res) => {
  upload(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            status: "fail",
            message:
              "File size exceeds the 5MB limit. Please upload a smaller file.",
          });
        }
      } else if (err) {
        console.error(err);
        return res.status(500).json({
          status: "error",
          message: "An unexpected error occurred during image upload.",
          error: err.message,
        });
      }

      if (
        !req.files ||
        !req.files.medicalLicense ||
        req.files.medicalLicense.length === 0
      ) {
        return res.status(400).json({
          status: "fail",
          message: "Medical license is required",
        });
      }

      const { email } = req.body;
      const emailExist = await Image.findOne({ email });

      if (emailExist) {
        return res.status(400).json({
          status: "fail",
          message:
            "A certificate is already associated with this account. Please review your account details or contact support if you need further assistance!",
        });
      }

      if (email === "null") {
        return res.status(400).json({
          status: "fail",
          message:
            "No account is available. Please create an account to access this service.",
        });
      }

      const medicalLicenseFile = req.files.medicalLicense[0];
      const medicalLicenseFileName = `${medicalLicenseFile.originalname}`;
      await uploadToMinio(medicalLicenseFile, medicalLicenseFileName);
      const bucketName = "mx-healthcare";

      // const medicalLicenseUrl = `${req.protocol}://${req.get("host")}/${medicalLicenseFileName}`;
      const medicalLicenseUrl = `${process.env.MINIO_ENDPOINT}/${bucketName}/${medicalLicenseFileName}`;

      let personalIdUrl = null;
      if (req.files.personalId && req.files.personalId.length > 0) {
        const personalIdFile = req.files.personalId[0];
        const personalIdFileName = `${personalIdFile.originalname}`;
        await uploadToMinio(personalIdFile, personalIdFileName);
        personalIdUrl = `${req.protocol}://${req.get(
          "host"
        )}/${personalIdFileName}`;
      }

      const newImage = await Image.create({
        medicalLicense: medicalLicenseUrl,
        personalId: personalIdUrl,
        email,
      });

      res.status(201).json({
        status: "success",
        data: {
          newImage,
        },
      });
    } catch (error) {
      console.error("Error details:", error);
      return res.status(500).json({
        status: "fail",
        message: "Internal Server Error",
        error: error,
      });
    }
  });
};

const uploadToMinio = (file, fileName) => {
  return new Promise((resolve, reject) => {
    const bucketName = "mx-healthcare";
    minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      { "Content-Type": file.mimetype },
      (minioErr) => {
        if (minioErr) {
          console.error(minioErr);
          return reject(minioErr);
        }
        resolve();
      }
    );
  });
};
