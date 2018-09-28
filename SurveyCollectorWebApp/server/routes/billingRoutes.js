module.exports = app => {
  app.post("/api/stripe", (req, res) => {
    //Get the token and reach out to Stripe API to finalize the charge
    //After finalizing the charge, update the user's number of credits in the database
  });
};
