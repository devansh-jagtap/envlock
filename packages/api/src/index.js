import "dotenv/config";
import express from "express";
import cors from "cors";

import secretsRouter from "./routes/secrets.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/", secretsRouter);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`KeyDrop API running on ${HOST}:${PORT}`);
});