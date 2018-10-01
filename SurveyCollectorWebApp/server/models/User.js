const mongoose = require("mongoose");
const { Schema } = mongoose;

//Define all the properties that a user record will contain
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//Create the users collection. Load schema into mongoose
mongoose.model("users", userSchema);
