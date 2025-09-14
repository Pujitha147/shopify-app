require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config");

// Import routes
const shopifyRoutes = require("./routes/shopify");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", shopifyRoutes);
app.use("/api", authRoutes); // ✅ Auth endpoints

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend running" });
});

// Start server after DB sync
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB connection failed:", err));
