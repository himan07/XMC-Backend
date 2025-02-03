const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { toEmail, emailMessage } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: "AKIAVXL545RJUKMZ6XZM",
        pass: "BAjNzPd2OMNzgJMXqpe1QSAQQuXUb2/Zv5PCQuGU8ZaT",
      },
    });

    const mailOptions = {
      from: "invest.india@market-xcel.co.in",
      to: toEmail,
      subject: "Subject",
      text: emailMessage,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ success: true, response: info.response });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
