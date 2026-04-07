import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filePath = path.resolve("server/data/users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath));
}

// LOGIN
router.post("/login", (req, res) => {

  const { username, password } = req.body;

  const users = readUsers();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ error: "Invalid credentials" });
  }

  res.json({
    success: true,
    username: user.username
  });
});

export default router;