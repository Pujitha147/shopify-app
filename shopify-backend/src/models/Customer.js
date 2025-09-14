const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tenant_id: { type: DataTypes.INTEGER, allowNull: false },
  shopify_customer_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});

module.exports = Customer;
