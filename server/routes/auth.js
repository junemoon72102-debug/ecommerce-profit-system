import express from "express";
import fs from "fs";

const router = express.Router();

const FILE = "./server/data/users.json";

function getUsers() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  if (users.find(u => u.username === username)) {
    return res.json({ error: "User exists" });
  }

  const role = username === "admin" ? "admin" : "user";

  users.push({ username, password, role });

  saveUsers(users);

  res.json({ message: "Registered" });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ error: "Invalid credentials" });
  }

  res.json({ role: user.role });
});

export default router;