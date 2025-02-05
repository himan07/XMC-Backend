const Minio = require("minio");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const minioClient = new Minio.Client({
  endPoint: 'https://d081-2409-40e3-5e-2bc0-bc90-7a48-347a-3471.ngrok-free.app',
  port: 443,
  useSSL: true,
  accessKey: 'himanshuyadav',
  secretKey: '#Himan123',
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
