import express from "express";
import fs from "fs";

const router = express.Router();

const FILE = "./server/data/products.json";

// read file safely
function read() {
  try {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// write file
function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET all products
router.get("/", (req, res) => {
  const products = read();
  res.json(products);
});

// ADD product
router.post("/", (req, res) => {
  try {
    const { name, cost, price } = req.body;

    if (!name || !cost || !price) {
      return res.status(400).json({ error: "Missing fields" });
    }

    let products = read();

    const newProduct = {
      id: Date.now(),
      name,
      cost: Number(cost),
      price: Number(price)
    };

    products.push(newProduct);

    write(products);

    res.json({ message: "Product added" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE product
router.delete("/:id", (req, res) => {
  let products = read();

  products = products.filter(p => p.id != req.params.id);

  write(products);

  res.json({ message: "Deleted" });
});

export default router;