const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

app.listen(config.port, () => {
  console.log("Backend is running...");
  mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      console.log("Database Connection Successful");
    })
    .catch((err) => {
      console.log(`Database Connection Error:${err.message}`);
    });
});
