const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        //Extract the path from the URL (e.g. : /api/surveys/5971/yes)
        //Extract the surveyID and the choice

        const match = p.test(new URL(url).pathname); //match will be null if surveyId and choice cannot be extracted
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })

      .compact() //Removes elements that are undefined
      .uniqBy("email", "surveyId") //Remove elements with duplicate email and surveyId
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false } //find the survey for the specific recipient who has not responded
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true }, //set the responded value to true once the user responds to the survey in the email
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  //Before creating a survey, check if the user is logged in and has sufficient credits
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      //Send an email
      await mailer.send();

      //save the survey to the database
      await survey.save();

      //Update the credits
      req.user.credits -= 1;
      const user = await req.user.save();

      //send the updated user to the client
      res.send(user);
    } catch (err) {
      res.status(422); //Unprocessable entity
    }
  });
};
