var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aamar.opseazy@gmail.com",
    pass: "tarnum92",
  },
});
function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

module.exports = { sendEmail };
