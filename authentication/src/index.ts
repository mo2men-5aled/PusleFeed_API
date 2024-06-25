import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI as string;

// Connect to MongoDB
mongoose
  .connect(
    MONGO_URI,
    // connect in a specific database
    { dbName: "PulseFeed" }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err.message));
