const express = require("express");
const { fetchCustomers, fetchProducts, fetchOrders } = require("../services/shopifyService");
const Customer = require("../models/customer");
const Product = require("../models/Product");
const Order = require("../models/Order");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Ingest Customers
router.get("/customers", authenticate, async (req, res) => {
  try {
    const customers = await fetchCustomers();

    const inserts = customers.map(async (c) => {
      const name = `${c.first_name} ${c.last_name}`.trim() || "No Name";
      const email = c.email || null;

      await Customer.findOrCreate({
        where: { shopify_customer_id: c.id, tenant_id: req.tenant_id },
        defaults: { name, email },
      });
    });

    await Promise.all(inserts);
    res.json({ message: "Customers ingested", count: customers.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to ingest customers", detail: err.message });
  }
});

// Ingest Products
router.get("/products", authenticate, async (req, res) => {
  try {
    const products = await fetchProducts();

    const inserts = products.map(async (p) => {
      let price = 0;
      if (p.variants?.length > 0) price = parseFloat(p.variants[0].price) || 0;

      const title = p.title || `Untitled Product ${p.id}`;
      const shopifyProductId = String(p.id);

      await Product.findOrCreate({
        where: { shopify_product_id: shopifyProductId, tenant_id: req.tenant_id },
        defaults: { title, price },
      });
    });

    await Promise.all(inserts);
    res.json({ message: "Products ingested", count: products.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to ingest products", detail: err.message });
  }
});

// Ingest Orders
router.get("/orders", authenticate, async (req, res) => {
  try {
    const orders = await fetchOrders();

    const inserts = orders.map(async (o) => {
      await Order.findOrCreate({
        where: { shopify_order_id: o.id, tenant_id: req.tenant_id },
        defaults: {
          customer_id: o.customer?.id || null,
          total_price: o.total_price,
        },
      });
    });

    await Promise.all(inserts);
    res.json({ message: "Orders ingested", count: orders.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to ingest orders", detail: err.message });
  }
});

module.exports = router;
