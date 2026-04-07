import express from "express";
import fs from "fs";
import path from "path";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const usersPath = path.resolve("server/data/users.json");
const productsPath = path.resolve("server/data/products.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(usersPath));
}

function readProducts() {
  return JSON.parse(fs.readFileSync(productsPath));
}


// ✅ ADMIN PANEL DATA
router.get("/", authMiddleware, (req, res) => {

  const users = readUsers();
  const products = readProducts();

  const result = users.map(user => {

    const userProducts = products.filter(p => p.userId === user.id);

    const totalProfit = userProducts.reduce((sum, p) => {
      return sum + (
        (Number(p.price || 0) * Number(p.quantity || 0)) -
        ((Number(p.cost || 0) * Number(p.quantity || 0)) + Number(p.ads || 0))
      );
    }, 0);

    return {
      username: user.username,
      totalProducts: userProducts.length,
      totalProfit,
      items: userProducts
    };
  });

  res.json({
    totalUsers: users.length,
    totalProducts: products.length,
    users: result
  });

});

export default router;