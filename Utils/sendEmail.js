const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  if (!to) {
    console.log("❌ Email recipient missing");
    return;
  }

  await transporter.sendMail({
    from: `"SHOP.CO" <${process.env.OWNER_USER}>`,
    to: to,
    subject: subject,
    html: html,
  });
};

module.exports = sendEmail;