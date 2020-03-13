const nodemailer = require("nodemailer");
const mailData = require("../../key/config");

const smtpConfig = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: mailData.senderEmailAddress,
    pass: mailData.senderEmailPassword
  }
});
const createMail = text => {
  return {
    from: mailData.senderEmailAddress,
    to: mailData.senderEmailAddress,
    subject: "ＣＴＲＬＨＰからの問い合わせ",
    text: text
  };
};

module.exports = {
  sendMail(req, res) {
    console.log(req.body);
    smtpConfig.sendMail(createMail(req.body), function(error, info) {
      error ? console.log(error) : console.log(`Email send:${info.response}`);
    });
    res.send({
      val: "testOK"
    });
  }
};
