import express from "express";
import cors from "cors";
import path from "path";

// routes
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// serve frontend (VERY IMPORTANT)
app.use(express.static(path.resolve("public")));

// API routes
app.use("/api", authRoutes);
app.use("/api/products", productsRoutes);

// default route (open login page)
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public", "login.html"));
});

// catch-all (prevents blank pages on refresh)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "login.html"));
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});