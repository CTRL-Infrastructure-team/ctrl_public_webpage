const nodemailer = require("nodemailer");
// const mailData = require("../config/key/config.js");
// gmailでの送信はよろしくないから別の方法を取るべき。
const axios = require("axios");
const { checkSchema } = require("express-validator");

require('dotenv').config();

const smtpConfig = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASSWORD
  }
});
const createMailmessage = (text, email) => {
  return {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: email,
    subject: "問い合わせを受け付けました。",
    text: `このメールアドレスは送信専用です。返信しても反応はできません。\n返信には時間がかかる場合がございます。\n 以下の内容で問い合わせを受けつけました。\n${text}`
  };
};
const discordSendmessage = (text, email) => {
  return {
    username: 'CTRL_HP',
    content: `CTRLホームページから問い合わせです。\n 内容：${text} \n email: ${email}`
  };
};

module.exports = {
  sendMail(req, res, next) {
    smtpConfig.sendMail(
      createMailmessage(req.body.inquiry, req.body.email),
      function(error, info) {
        error ? console.log(error) : console.log(`Email send:${info.response}`);
      }
    );
    next();
  },
  sendDiscord(req, res) {
    axios
      .post(
        process.env.DISCORD_URL,
        discordSendmessage(req.body.inquiry, req.body.email),
        //postData,
        {
          headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
          }
        }
      )
      .then(() => console.log("send"))
      .catch(err => console.log(err.message));
    res.send({
      val: "testOK"
    });
  },
  validateMail: checkSchema({
    email: {
      in: ["body"],
      isEmail: true,
      errorMessage: "不正なメールアドレスです。"
    },
    inquiry: {
      in: ["body"],
      exists: true,
      errorMessage: "何かしら入力して"
    }
  })
};
// smtpConfig.sendMail(createMail("test"), function(error, info) {
//   error ? console.log(error) : console.log(`Email send:${info.response}`);
// });
