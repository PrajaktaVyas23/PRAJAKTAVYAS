import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import materialsRouter from "./routes/materials.js";
import chatRouter from "./routes/chat.js";
import analyticsRouter from "./routes/analytics.js";
import { ensureUploadDir } from "./services/storage.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

ensureUploadDir();

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", authRouter);
app.use("/materials", materialsRouter);
app.use("/chat", chatRouter);
app.use("/analytics", analyticsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
