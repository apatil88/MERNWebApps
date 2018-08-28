const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport"); //We just need to execute code in this file, nothing is being exported from this file.

mongoose.connect(keys.mongoURI);

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
