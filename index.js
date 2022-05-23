require("dotenv").config();
require("./helpers/dbconnect");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes/index");

const cors = require("cors");
const helmet = require("helmet");
const responseTime = require("response-time");

const compression = require("compression");
const {
  isAuthenticatedAdmin,
} = require("./middlewares/admin/isAuthenticatedAdmin");

//gzip compression
app.use(compression());

// Set security headers
app.use(helmet());

// CORS
const corsOptions = {
  exposedHeaders: "authorization",
};
app.use(cors(corsOptions));

// Response time
app.use(responseTime({ suffix: false }));

//Express Parser
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(express.json());

//Routes
app.use("/", routes);

// Home route
app.get("/", isAuthenticatedAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome, This is App's Backend",
  });
});

//Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
