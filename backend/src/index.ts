import mongoose from "mongoose";
import "dotenv/config"; 
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/lld-practice";

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
.catch(err => console.error("MongoDB connection failed:", err));