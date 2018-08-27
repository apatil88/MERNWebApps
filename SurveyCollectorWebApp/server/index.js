const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

//Tell Passport to make use of Google Strategy for authenticating
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" //Route the user will be sent to after granting permissions
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log("profile: ", profile);
    }
  )
);

//Route Handler for OAuth Flow
//GoogleStrategy internally has an identifier with the name "google". This is used by passport during the OAuth authentication process.
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Route Handler to handler when Google directs user to /auth/google/callback with the code. This code will be sent by our server to Google to get the user profile.
app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
