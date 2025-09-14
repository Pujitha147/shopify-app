const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
  shopify_order_id: { type: DataTypes.STRING },
  customer_id: { type: DataTypes.STRING },
  total_price: { type: DataTypes.FLOAT },
});

module.exports = Order;
