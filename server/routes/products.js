import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const filePath = path.resolve("server/data/products.json");

function readData() {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET PRODUCTS
router.get("/", (req, res) => {
  res.json(readData());
});

// ADD PRODUCT
router.post("/", (req, res) => {

  const data = readData();

  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  data.push(newProduct);
  writeData(data);

  res.json({ message: "Added" });
});

export default router;