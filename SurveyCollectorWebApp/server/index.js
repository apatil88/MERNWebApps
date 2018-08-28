const express = require("express");
require("./services/passport"); //We just need to execute code in this file, nothing is being exported from this file.

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
