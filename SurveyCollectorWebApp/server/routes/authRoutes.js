const passport = require("passport");

module.exports = app => {
  //Route Handler for OAuth Flow
  //GoogleStrategy internally has an identifier with the name "google". This is used by passport during the OAuth authentication process.
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  //Route Handler to handler when Google directs user to /auth/google/callback with the code. This code will be sent by our server to Google to get the user profile.
  app.get("/auth/google/callback", passport.authenticate("google"));
};
