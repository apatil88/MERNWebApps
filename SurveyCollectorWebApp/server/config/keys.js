//Decide which credentials to use depending on dev or prod environment
if (process.env.NODE_ENV === "production") {
  //return the prod set of keys
  module.exports = require("./prod");
} else {
  //return the dev set of keys
  module.exports = require("./dev");
}
