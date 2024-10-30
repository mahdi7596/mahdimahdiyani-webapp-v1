module.exports = {
  email: {
    provider: "sendgrid",
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.FROM_EMAIL || "no-reply@example.com",
  },
  sms: {
    provider: "twilio",
    accountSid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
};
