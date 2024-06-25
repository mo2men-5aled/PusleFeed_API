import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(
    MONGO_URI,
    // connect in a specific database
    { dbName: "PulseFeed" }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Post Service running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));
