const config = require("../../../config");
const transporter = require("../../helpers/transporter");

async function sendEmail({ to, subject, html }) {
  const message = {
    from: config.mailOptions.auth.user,
    to,
    subject,
    html,
  };
  return await transporter.sendMail(message);
}

module.exports = {
  sendEmail,
};
