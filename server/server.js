const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
require("colors");
const connectDB = require("./config/db_connect");

dotenv.config({ path: "./config/.env" });
connectDB();

//Init Express
const app = express();

// const { allowCrossDomain } = require("./controllers/memories");
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());
// app.use(allowCrossDomain);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
const memories = require("./routes/memories");
app.use("/api/v1/memories", memories);
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Page not found, check URL and try again!",
  });
});

//Server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${port}`.green
      .bold.underline
  );
});
