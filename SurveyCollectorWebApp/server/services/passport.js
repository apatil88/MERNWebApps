const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); //Pull a model out of mongoose

//Tell Passport to make use of Google Strategy for authenticating
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" //Route the user will be sent to after granting permissions
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log("accessToken: ", accessToken);
      //console.log("refreshToken: ", refreshToken);
      //console.log("profile: ", profile);

      //create a new instance of User and save it to the database
      new User({
        googleId: profile.id
      }).save();
    }
  )
);
