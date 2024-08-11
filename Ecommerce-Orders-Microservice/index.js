const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./models");
const ordersRoute = require("./routes/ordersRoute");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/v1/orders", ordersRoute);

// Configure sequelize to sync all models and create corresponding tables accordingly
database.sequelize.sync().then(() => {
  console.log("Db connection successful");
  const PORT = process.env.PORT || 8300;
  app.listen(PORT, () => {
    console.log(`Backend server is listening at port ${PORT}`);
  });
});