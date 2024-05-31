import "dotenv/config";
import nodemailer from "nodemailer";

const { MAILTRAP_USERNAME, MAILTRAP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

const sendMail = data => {
  const email = { ...data, from: MAILTRAP_USERNAME };
  return transport.sendMail(email);
}

export default sendMail;
