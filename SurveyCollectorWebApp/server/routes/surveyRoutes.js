const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

module.exports = app => {
  //Before creating a survey, check if the user is logged in and has sufficient credits
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {});
};
