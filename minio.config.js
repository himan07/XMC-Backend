const Minio = require("minio");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;

minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error("Error checking bucket existence:", err);
    throw err;
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, "", (makeBucketErr) => {
      if (makeBucketErr) {
        console.error("Error creating bucket:", makeBucketErr);
        throw makeBucketErr;
      }
    });
  }
});

module.exports = minioClient;
