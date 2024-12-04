const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD, // App password or Gmail password
  },
});

// Function to send an email
exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL}>`, // Sender email
      to: receiverEmail, // Receiver email
      subject: subject, // Email subject
      html: body, // Email body (HTML content)
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error; // Re-throw the error for higher-level handling
  }
};
