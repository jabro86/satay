import * as sgMail from "@sendgrid/mail";

import { SENDGRID_API_KEY } from "./config";

if (process.env.NODE_ENV === "production") {
  if (SENDGRID_API_KEY === undefined) {
    throw Error("No API key found for send grid mail service!");
  }
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export const sendConfirmationEmail = async (recipient: string, url: string) => {
  const response = await sgMail.send({
    to: recipient,
    from: "test@example.com",
    subject: "Please confirm your registration",
    text: `Confirm your registration: ${url}`,
    html: `<strong>Welcome to Satay!</strong>
    Confirm your registration by clicking <a href="${url}">here</a>.`
  });

  console.log(response, recipient);
};

export const sendResetPasswordEmail = async (
  recipient: string,
  url: string
) => {
  const response = await sgMail.send({
    to: recipient,
    from: "test@example.com",
    subject: "Forgot your password?",
    text: `Reset your password: ${url}`,
    html: `Reset your password <a href="${url}">here</a>`
  });

  console.log(response, recipient);
};
