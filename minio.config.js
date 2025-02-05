const Minio = require("minio");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT.replace("https://", "").replace("/", ""), 
  port: parseInt(process.env.MINIO_PORT, 10) || 443, 
  useSSL: true,
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
    } else {
      console.log(`Bucket '${bucketName}' already exists.`);
    }
  } catch (err) {
    console.error("Error with MinIO bucket:", err);
  }
})();

module.exports = minioClient;
