const Minio = require("minio");
const dotenv = require("dotenv");

dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT.replace("https://", "").replace("http://", ""),
  port: parseInt(process.env.MINIO_PORT, 10) || 9000,
  useSSL: process.env.NODE_ENV === "production",
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;

(async () => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, "");
      console.log(`Bucket '${bucketName}' created successfully.`);
    }
  } catch (err) {
    console.error("Error with MinIO bucket:", err);
  }
})();

module.exports = minioClient;
