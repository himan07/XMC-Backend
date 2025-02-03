const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection Successful!");
  });

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});
