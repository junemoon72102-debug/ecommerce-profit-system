import express from "express";
import fs from "fs";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const PRODUCTS_FILE = "./server/data/products.json";

// Export CSV
router.get("/", authMiddleware, (req, res) => {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE));

  const userProducts = products.filter(p => p.userId === req.user.id);

  let csv = "Name,Cost,Selling,Ads,Fees,Delivery,ReturnRate\n";

  userProducts.forEach(p => {
    csv += `${p.name},${p.cost_price},${p.selling_price},${p.ad_spend},${p.platform_fees},${p.delivery_cost},${p.return_rate}\n`;
  });

  res.header("Content-Type", "text/csv");
  res.attachment("products.csv");
  res.send(csv);
});

export default router;