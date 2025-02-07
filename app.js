const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const uploadCertificateRouter = require("./src/routes/uploadcert.routes");
const getUser = require("./src/routes/getUser.routes");
const personalInfo = require("./src/routes/createPersonalnfo.routes");
const LoginUser = require("./src/routes/auth.routes");
const getDashboardData = require("./src/routes/getDashboardData.routes");
const userVerification = require("./src/routes/userVerification.routes");
const updateSurveyStatus = require("./src/routes/updateSurvey.routes");
const getSupplierData = require("./src/routes/getSupplierData.routes");
const updateSurveyStatusApprovalRejection = require("./src/routes/updateSurveyStatus.routes");
const createRedemption = require("./src/routes/redemption.routes");
const getRedemption = require("./src/routes/getRedemption.routes");
const ApproveRejectRedemption = require("./src/routes/redemption_Approval_rejection.routes");
const sendEmail = require("./src/routes/sendEmail.routes");
const surveys = require('./src/routes/surveys.routes')

const cookieParser = require("cookie-parser");

app.use(cors());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/uploadImage", uploadCertificateRouter);
app.use("/getUsers", getUser);
app.use("/create-personalInfo", personalInfo);
app.use("/login", LoginUser);
app.use("/getDasboardData", getDashboardData);
app.use("/api/userVerification", userVerification);
app.use("/api/update-survey", updateSurveyStatus);
app.use("/supplier/getSupplier", getSupplierData);
app.use("/api/update-survey-status", updateSurveyStatusApprovalRejection);
app.use("/api/user/redemption", createRedemption);
app.use("/api/user/getRedemptionData", getRedemption);
app.use("/api/update-redemption-status", ApproveRejectRedemption);
app.use("/api/send-email", sendEmail);
app.use("/update/surveys", surveys);

module.exports = app;
