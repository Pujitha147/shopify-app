const express = require("express");
const authenticateToken = require("../middleware/auth");

// Sequelize models
const Customer = require("../models/customer");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = express.Router();

/**
 * @route GET /api/ingest/customers
 * @desc Fetch all customers for the authenticated tenant
 */
router.get("/ingest/customers", authenticateToken, async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: { tenant_id: req.user.tenant_id },
    });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch customers", details: err.message });
  }
});

/**
 * @route GET /api/ingest/products
 * @desc Fetch all products for the authenticated tenant
 */
router.get("/ingest/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { tenant_id: req.user.tenant_id },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
});

/**
 * @route GET /api/ingest/orders
 * @desc Fetch all orders for the authenticated tenant
 */
router.get("/ingest/orders", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { tenant_id: req.user.tenant_id },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders", details: err.message });
  }
});

module.exports = router;
