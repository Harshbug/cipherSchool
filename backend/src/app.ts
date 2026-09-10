import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import problemRoutes from "./routes/problemRoutes";
import attemptRoutes from "./routes/attemptRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", problemRoutes);
app.use("/api", attemptRoutes);

export default app;