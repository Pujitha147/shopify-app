// src/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Define User model
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "Users",
  timestamps: true,
});

// Sync database
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database synced"))
  .catch(err => console.error("❌ Sync error:", err));

module.exports = { sequelize, User };
