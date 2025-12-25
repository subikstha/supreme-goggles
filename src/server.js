import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import pool from "./db.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Without the above, req.body will be undefined

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

app.post("/getBmi", async (req, res) => {
  const { full_name } = req.body;
  console.log("this is the full name", full_name);
  const { rows } = await pool.query(
    `SELECT s.student_name, ROUND(s.weight/(s.height*s.height),2) AS bmi, b.category AS bmi_category FROM students s INNER JOIN bmi_categories b ON (s.weight/(s.height*s.height)) BETWEEN b.min_value AND b.max_value WHERE s.student_name = $1`,
    [full_name]
  );
  console.log("get bmi", rows);
  res.status(200).json(rows[0]);
});

app.post("/join", async (req, res) => {
  const { full_name, weight, height } = req.body;

  const w = Number(weight);
  const h = Number(height);

  const { rows } = await pool.query(
    `INSERT INTO students (student_name, weight, height) VALUES ($1,$2,$3)`,
    [full_name, w, h]
  );

  console.log("Inserted row", rows);

  res.status(201).json({
    status: "OK",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
