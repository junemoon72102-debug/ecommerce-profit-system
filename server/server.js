import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static(path.resolve("public")));

// routes
app.use("/api", authRoutes);
app.use("/api/products", productsRoutes);

// fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "login.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});