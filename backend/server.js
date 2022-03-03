const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

require("dotenv").config({ path: "./config/config.env" });
const PORT = process.env.PORT;

app.use("/api/v1", require("./routes"));
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("Server running at PORT 5000");
  await connectDB();
});

module.exports = app;
