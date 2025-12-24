import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Without the above, req.body will be undefined

app.post("/join", async (req, res) => {
  const { full_name, weight, height } = req.body;

  console.log("full name ", full_name);

  res.status(200).json({
    status: "OK",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
