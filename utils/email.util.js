const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const pug = require("pug");
const path = require("path");
const { htmlToText } = require("html-to-text");

dotenv.config({ path: "./config.env" });

class Email {
  constructor(to) {
    this.to = to; //!  Assign Recipient Capture on Creation
  }

  //? Connect to mail service
  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Connect to SendGrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }

    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  // Send the actual mail
  async send(template, subject, mailData) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`), //?route
      mailData,
      console.log(mailData)
    );

    await this.newTransport().sendMail({
      from: process.env.MAIL_FROM,
      to: this.to, //?assign recipient
      subject,
      html,
      text: htmlToText(html), //convert pug to html
    });
  }

  async sendWelcome(name) {
    await this.send("welcome", "Welcome to our app", { name });
  }

  async sendTotal(Product, total) {
    await this.send("Total", "You have created a new post", {
      quantity,
      price,
    });
  }
}

module.exports = { Email };
