import app from "./config/app.js";
import config from "./config/config.js";
import connectToDatabase from "./config/database.js";

// Connect to the database
connectToDatabase();

app.listen(config.port, () => {
  console.log("server is running on port " + config.port);
});
