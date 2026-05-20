import express from "express";
import cors from "cors";
import secretsRouter from "./routes/secrets.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", secretsRouter);

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`KeyDrop API running on http://localhost:${PORT}`);
});