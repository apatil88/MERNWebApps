const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  //Before creating a survey, check if the user is logged in and has sufficient credits
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //Create a Survey instance
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id, //id is automatically generated by Mongo,
      dateSent: Date.now()
    });

    //Send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
