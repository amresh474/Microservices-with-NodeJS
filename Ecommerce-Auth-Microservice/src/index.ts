import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import morgan from "morgan";

dotenv.config();
app.use(morgan("common"));

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(helmet());

app.use(express.json());

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    res.send(
      "Welcome to unit testing guide for nodejs, typescript and express!"
    );
  } catch (err) {
    console.log(err);
  }
});

// DB CONNECTION

if (!process.env.MONGODB_URL) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    res.send(
      "Welcome to unit testing guide for nodejs, typescript and express"
    );
  } catch (err) {
    console.log(err);
  }
});

// Serve other routes
app.use("/api/v1/auth/", authRoute);

// Start backend server
const PORT = process.env.PORT || 8900;

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
