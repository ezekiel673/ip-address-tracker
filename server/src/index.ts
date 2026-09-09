import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ipRouter from "./routes/ip";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/ip", ipRouter);

app.listen(PORT, () => {
  console.log(`IP Address Tracker API listening on http://localhost:${PORT}`);
});
