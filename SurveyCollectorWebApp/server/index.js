const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User"); //NOTE: User schema should be defined first before it is used in ./services/passport
require("./models/Survey");
require("./services/passport"); //We just need to execute code in this file, nothing is being exported from this file.

mongoose.connect(keys.mongoURI);

const app = express();

//body-parser middleware for parsing request
app.use(bodyParser.json());

//Enable cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //Cookie should expire after 30 days
    keys: [keys.cookieKey] //Encrypt the cookie
  })
);

//Tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
