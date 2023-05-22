const nodeMailer = require("nodemailer");
const config = require("../../config");

module.exports = nodeMailer.createTransport(config.mailOptions);
