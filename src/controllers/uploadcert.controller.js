const multer = require("multer");
const s3 = require("../../minio.config");
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

      const bucketName = process.env.AWS_BUCKET_NAME;

      const medicalLicenseFile = req.files.medicalLicense[0];
      const medicalLicenseFileName = `${Date.now()}-${
        medicalLicenseFile.originalname
      }`;
      const medicalLicenseUrl = await uploadToS3(
        medicalLicenseFile,
        bucketName,
        medicalLicenseFileName
      );

      let personalIdUrl = null;
      if (req.files.personalId && req.files.personalId.length > 0) {
        const personalIdFile = req.files.personalId[0];
        const personalIdFileName = `${Date.now()}-${
          personalIdFile.originalname
        }`;
        personalIdUrl = await uploadToS3(
          personalIdFile,
          bucketName,
          personalIdFileName
        );
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
        status: error.message,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

const uploadToS3 = (file, bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("Invalid file buffer"));
    }

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        return reject(err);
      }

      console.log("S3 Upload Successful:", data);
      resolve(data.Location);
    });
  });
};
